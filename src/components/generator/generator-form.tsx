"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { generateSchema, type GenerateInput } from "@/lib/validations"
import { OBJECTIVES, TONES } from "@/constants"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Sparkles, Loader2, Wand2, Info } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function GeneratorForm() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(generateSchema),
        defaultValues: {
            topic: "",
            objective: "engagement",
            tone: "professional",
            minWords: 50,
            maxWords: 300,
            variantCount: 1,
            personalize: false,
        },
    })

    async function onSubmit(values: GenerateInput) {
        setIsLoading(true)
        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                body: JSON.stringify(values),
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.message || "Failed to generate post")
            }

            const data = await response.json()
            toast.success("LinkedIn posts generated successfully!")

            // Navigate to the post details page (we will create this next)
            router.push(`/app/history/${data.id}`)
        } catch (error: any) {
            toast.error(error.message || "Something went wrong. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="relative space-y-6 bg-slate-900 rounded-[2rem] overflow-hidden p-6 border border-slate-800 shadow-sm">
                {/* Video Background */}
                <div className="absolute inset-0 z-0">
                    <video
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                    >
                        <source src="/hero-bg-2-cropped.mp4" type="video/mp4" />
                    </video>
                    {/* Dark overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/85 to-slate-950/90" />
                </div>

                {/* Form content with relative positioning */}
                <div className="relative z-10 space-y-6">
                    <FormField
                        control={form.control}
                        name="topic"
                        render={({ field }: { field: any }) => (
                            <FormItem>
                                <FormLabel className="text-base font-bold text-white">What do you want to post about?</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="E.g., Share the 5 biggest mistakes founders make in their first year..."
                                        className="min-h-[120px] rounded-2xl border-slate-700 bg-slate-950 focus:ring-slate-700 text-sm text-white placeholder:text-slate-500"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="objective"
                            render={({ field }: { field: any }) => (
                                <FormItem>
                                    <FormLabel className="font-bold text-white">Target Objective</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="h-11 rounded-xl border-slate-700 bg-slate-950 focus:ring-slate-700 text-white text-sm">
                                                <SelectValue placeholder="Select an objective" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="rounded-xl bg-slate-900 border-slate-800 text-white">
                                            {OBJECTIVES.map((obj) => (
                                                <SelectItem key={obj.value} value={obj.value} className="py-3">
                                                    {obj.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="tone"
                            render={({ field }: { field: any }) => (
                                <FormItem>
                                    <FormLabel className="font-bold text-white">Post Tone</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="h-12 rounded-xl border-slate-700 bg-slate-950 focus:ring-slate-700 text-white">
                                                <SelectValue placeholder="Select a tone" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="rounded-xl bg-slate-900 border-slate-800 text-white">
                                            {TONES.map((tone) => (
                                                <SelectItem key={tone.value} value={tone.value} className="py-3">
                                                    {tone.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                            control={form.control}
                            name="minWords"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold text-white">Min Words</FormLabel>
                                    <FormControl>
                                        <input
                                            type="number"
                                            className="w-full h-12 rounded-xl border border-slate-700 px-3 bg-slate-950 text-white text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-700 placeholder:text-slate-500"
                                            {...field}
                                            value={field.value ?? ''}
                                            onChange={e => field.onChange(e.target.value === '' ? undefined : parseInt(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="maxWords"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold text-white">Max Words</FormLabel>
                                    <FormControl>
                                        <input
                                            type="number"
                                            className="w-full h-12 rounded-xl border border-slate-700 px-3 bg-slate-950 text-white text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-700 placeholder:text-slate-500"
                                            {...field}
                                            value={field.value ?? ''}
                                            onChange={e => field.onChange(e.target.value === '' ? undefined : parseInt(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="variantCount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold text-white">Variants</FormLabel>
                                    <Select onValueChange={(val) => field.onChange(parseInt(val))} defaultValue={field.value?.toString()}>
                                        <FormControl>
                                            <SelectTrigger className="h-12 rounded-xl border-slate-700 bg-slate-950 focus:ring-slate-700 text-white">
                                                <SelectValue placeholder="1" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="rounded-xl bg-slate-900 border-slate-800 text-white">
                                            {[1, 2, 3].map((num) => (
                                                <SelectItem key={num} value={num.toString()} className="py-3">
                                                    {num}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Personalize Checkbox */}
                    <FormField
                        control={form.control}
                        name="personalize"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-slate-800 bg-slate-950/50 p-4">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        className="border-slate-600 data-[state=checked]:bg-slate-200 data-[state=checked]:text-slate-900"
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <div className="flex items-center gap-2">
                                        <FormLabel className="font-semibold text-white">
                                            Personalize with my profile
                                        </FormLabel>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Info className="h-4 w-4 text-slate-400 cursor-help" />
                                                </TooltipTrigger>
                                                <TooltipContent className="max-w-xs">
                                                    <p>Uses your Bio and Niche from Settings to generate posts tailored to your brand and expertise</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-14 text-lg font-bold bg-white text-slate-900 hover:bg-slate-200 shadow-none rounded-2xl group transition-all"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            "Generate"
                        )}
                    </Button>

                    <p className="text-center text-sm text-slate-400">
                        This will use 1 generation credit
                    </p>
                </div>
            </form>
        </Form>
    )
}
