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
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Sparkles, Loader2, Wand2 } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function GeneratorForm() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const form = useForm<GenerateInput>({
        resolver: zodResolver(generateSchema),
        defaultValues: {
            topic: "",
            objective: "engagement",
            tone: "professional",
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }: { field: any }) => (
                        <FormItem>
                            <FormLabel className="text-lg font-bold text-slate-900">What do you want to post about?</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="E.g., Share the 5 biggest mistakes founders make in their first year..."
                                    className="min-h-[150px] rounded-2xl border-slate-200 focus:ring-slate-900 text-base"
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
                                <FormLabel className="font-bold text-slate-900">Target Objective</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="h-12 rounded-xl border-slate-200 focus:ring-slate-900">
                                            <SelectValue placeholder="Select an objective" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="rounded-xl">
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
                                <FormLabel className="font-bold text-slate-900">Post Tone</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="h-12 rounded-xl border-slate-200 focus:ring-slate-900">
                                            <SelectValue placeholder="Select a tone" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="rounded-xl">
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

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-14 text-lg font-bold bg-slate-900 hover:bg-slate-800 shadow-none rounded-2xl group transition-all"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Generating Post Variants...
                        </>
                    ) : (
                        <>
                            <Wand2 className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                            Generate 3 Post Screenshots
                        </>
                    )}
                </Button>

                <p className="text-center text-sm text-slate-400">
                    This will use 1 generation credit
                </p>
            </form>
        </Form>
    )
}
