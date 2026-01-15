"use client"

import { useState } from "react"
import { LinkedInPreview } from "@/components/generator/linkedin-preview"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Share2, Copy, Check, Sparkles, Image as ImageIcon, Loader2 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface GenerationViewProps {
    generation: {
        id: string
        topic: string
        objective: string
        tone: string
        imageUrl: string | null
        createdAt: Date
        variants: Array<{
            id: string
            content: string
            imageUrl?: string | null
        }>
    }
}

export function GenerationView({ generation }: GenerationViewProps) {
    const [activeTab, setActiveTab] = useState("variant-0")
    const [isDownloadingImage, setIsDownloadingImage] = useState(false)

    // Get current active variant index
    const activeIndex = parseInt(activeTab.split("-")[1])
    const activeVariant = generation.variants[activeIndex]

    const handleCopyCaption = () => {
        if (!activeVariant) return
        navigator.clipboard.writeText(activeVariant.content)
        toast.success("Caption copied to clipboard!")
    }

    const handleDownloadImage = async () => {
        const imageUrl = activeVariant?.imageUrl || generation.imageUrl

        if (!imageUrl) {
            toast.error("No image to download")
            return
        }

        setIsDownloadingImage(true)
        try {
            // Fetch the image via proxy to avoid CORS
            const proxyUrl = `/api/image-proxy?url=${encodeURIComponent(imageUrl)}`
            const response = await fetch(proxyUrl)
            if (!response.ok) throw new Error("Failed to fetch image data")

            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = `postgen-${generation.topic.slice(0, 20).replace(/\s+/g, '-')}-${Date.now()}.png`
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)

            toast.success("Image saved!")
        } catch (error) {
            console.error("Download image error:", error)
            toast.error("Failed to download image.")
        } finally {
            setIsDownloadingImage(false)
        }
    }

    return (
        <div className="max-w-6xl mx-auto space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <Link href="/app/history" className="flex items-center text-sm text-slate-500 hover:text-slate-900 transition-colors mb-4">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to history
                    </Link>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight line-clamp-1">
                        {generation.topic}
                    </h1>
                    <p className="text-slate-500">
                        Generated on {new Date(generation.createdAt).toLocaleDateString()} • {generation.variants.length} Variants
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-xl border-slate-200 cursor-pointer">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                    </Button>
                    <Button onClick={handleDownloadImage} disabled={isDownloadingImage} className="bg-slate-900 hover:bg-slate-800 rounded-xl shadow-none cursor-pointer text-white">
                        <Download className="mr-2 h-4 w-4" />
                        {isDownloadingImage ? "Exporting..." : "Export"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left: Previews */}
                <div className="lg:col-span-7 space-y-8">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-slate-900">Choose Your Variant</h3>
                            <TabsList className="bg-slate-100 p-1 rounded-xl">
                                {generation.variants.map((_: any, index: number) => (
                                    <TabsTrigger
                                        key={index}
                                        value={`variant-${index}`}
                                        className="rounded-lg px-4 font-bold data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm cursor-pointer"
                                    >
                                        v{index + 1}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>

                        {generation.variants.map((variant, index) => {
                            const variantImage = variant.imageUrl || generation.imageUrl;
                            return (
                                <TabsContent key={variant.id} value={`variant-${index}`} className="mt-0 focus-visible:ring-0">
                                    <div className="flex justify-center bg-slate-100 rounded-[2.5rem] p-8 md:p-12 border border-slate-200 shadow-inner">
                                        <LinkedInPreview
                                            content={variant.content}
                                            imageUrl={variantImage ? `/api/image-proxy?url=${encodeURIComponent(variantImage)}` : undefined}
                                        />
                                    </div>
                                </TabsContent>
                            )
                        })}
                    </Tabs>
                </div>

                {/* Right: Controls/Info */}
                <div className="lg:col-span-5 space-y-6">
                    <Card className="rounded-[2rem] border-slate-200 shadow-sm overflow-hidden bg-white">
                        <CardContent className="p-8 space-y-8">
                            <div>
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Post Details</h4>
                                <div className="space-y-4">
                                    <DetailRow label="Objective" value={generation.objective} />
                                    <DetailRow label="Tone" value={generation.tone} />
                                    <DetailRow label="Model" value="GPT-4o Mini" />
                                </div>
                            </div>

                            <div className="pt-8 border-t border-slate-100">
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Original Topic</h4>
                                <div className="bg-slate-50 rounded-2xl p-4 text-slate-600 text-sm italic leading-relaxed">
                                    "{generation.topic}"
                                </div>
                            </div>

                            <div className="pt-8 border-t border-slate-100 space-y-4">
                                <Button
                                    variant="outline"
                                    onClick={handleCopyCaption}
                                    className="w-full h-12 rounded-xl border-slate-200 font-bold group hover:border-slate-300 hover:text-slate-900 cursor-pointer"
                                >
                                    <Copy className="mr-2 h-4 w-4 text-slate-500 group-hover:text-slate-900 transition-colors" />
                                    Copy Current Caption
                                </Button>

                                {generation.imageUrl && (
                                    <Button
                                        variant="outline"
                                        onClick={handleDownloadImage}
                                        disabled={isDownloadingImage}
                                        className="w-full h-12 rounded-xl border-slate-200 font-bold group hover:border-slate-300 hover:text-slate-900 cursor-pointer"
                                    >
                                        {isDownloadingImage ? (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        ) : (
                                            <Download className="mr-2 h-4 w-4 text-slate-500 group-hover:text-slate-900 transition-colors" />
                                        )}
                                        {isDownloadingImage ? "Saving..." : "Save Image"}
                                    </Button>
                                )}

                                <p className="text-[10px] text-center text-slate-400">
                                    Tip: You can edit the caption directly on LinkedIn after pasting.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-xl shadow-slate-200 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform">
                            <Sparkles className="h-20 w-20" />
                        </div>
                        <h4 className="text-xl font-bold mb-2">Need a different angle?</h4>
                        <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                            You can regenerate this post with a different tone or objective to see more options.
                        </p>
                        <Link href="/app/generate">
                            <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-xl border-none h-12 cursor-pointer">
                                Try Another Version
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

function DetailRow({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">{label}</span>
            <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-bold text-slate-700 capitalize">
                {value.toLowerCase()}
            </span>
        </div>
    )
}
