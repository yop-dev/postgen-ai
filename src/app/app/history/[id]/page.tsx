import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { notFound, redirect } from "next/navigation"
import { LinkedInPreview } from "@/components/generator/linkedin-preview"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Share2, Copy, Check, Sparkles } from "lucide-react"
import Link from "next/link"

export default async function GenerationDetailsPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { userId } = await auth()

    if (!userId) {
        redirect("/sign-in")
    }

    const { id } = await params

    const generation = await db.generation.findUnique({
        where: {
            id,
            user: {
                clerkId: userId
            }
        },
        include: {
            variants: true
        }
    })

    if (!generation) {
        notFound()
    }

    return (
        <div className="max-w-6xl mx-auto space-y-10 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <Link href="/app/history" className="flex items-center text-sm text-slate-500 hover:text-blue-600 transition-colors mb-4">
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
                    <Button variant="outline" className="rounded-xl border-slate-200">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-200">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left: Previews */}
                <div className="lg:col-span-7 space-y-8">
                    <Tabs defaultValue="variant-0" className="w-full">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-slate-900">Choose Your Variant</h3>
                            <TabsList className="bg-slate-100 p-1 rounded-xl">
                                {generation.variants.map((_: any, index: number) => (
                                    <TabsTrigger
                                        key={index}
                                        value={`variant-${index}`}
                                        className="rounded-lg px-4 font-bold"
                                    >
                                        v{index + 1}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>

                        {generation.variants.map((variant: any, index: number) => (
                            <TabsContent key={variant.id} value={`variant-${index}`} className="mt-0 focus-visible:ring-0">
                                <div className="flex justify-center bg-slate-100 rounded-[2.5rem] p-8 md:p-12 border border-slate-200 shadow-inner">
                                    <LinkedInPreview
                                        content={variant.content}
                                        imageUrl={generation.imageUrl || undefined}
                                    />
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>

                {/* Right: Controls/Info */}
                <div className="lg:col-span-5 space-y-6">
                    <Card className="rounded-[2rem] border-slate-200 shadow-sm overflow-hidden">
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
                                <Button variant="outline" className="w-full h-12 rounded-xl border-slate-200 font-bold group">
                                    <Copy className="mr-2 h-4 w-4 group-hover:text-blue-600" />
                                    Copy Current Caption
                                </Button>
                                <p className="text-[10px] text-center text-slate-400">
                                    Tip: You can edit the caption directly on LinkedIn after pasting.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="bg-blue-600 rounded-[2rem] p-8 text-white shadow-xl shadow-blue-200 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform">
                            <Sparkles className="h-20 w-20" />
                        </div>
                        <h4 className="text-xl font-bold mb-2">Need a different angle?</h4>
                        <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                            You can regenerate this post with a different tone or objective to see more options.
                        </p>
                        <Link href="/app/generate">
                            <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-bold rounded-xl border-none h-12">
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
