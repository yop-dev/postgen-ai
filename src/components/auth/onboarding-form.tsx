"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { onboardingSchema, type OnboardingInput } from "@/lib/validations"
import { TONES } from "@/constants"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Loader2, ArrowRight, UserCheck } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function OnboardingForm() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const form = useForm<OnboardingInput>({
        resolver: zodResolver(onboardingSchema),
        defaultValues: {
            niche: "",
            preferredTone: "professional",
            bio: "",
        },
    })

    async function onSubmit(values: OnboardingInput) {
        setIsLoading(true)
        try {
            const response = await fetch("/api/onboarding", {
                method: "POST",
                body: JSON.stringify(values),
            })

            if (!response.ok) {
                throw new Error("Failed to save profile")
            }

            toast.success("Profile set up successfully!")
            router.push("/app")
        } catch (error: any) {
            toast.error("Something went wrong. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="niche"
                    render={({ field }: { field: any }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Your Niche / Industry</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. SaaS, Real Estate, Web3" {...field} className="rounded-xl h-12" />
                            </FormControl>
                            <FormDescription>
                                This helps us tailor your content better.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="preferredTone"
                    render={({ field }: { field: any }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Default Tone</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="rounded-xl h-12">
                                        <SelectValue placeholder="Select a tone" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {TONES.map((tone) => (
                                        <SelectItem key={tone.value} value={tone.value}>
                                            {tone.label}
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
                    name="bio"
                    render={({ field }: { field: any }) => (
                        <FormItem>
                            <FormLabel className="font-bold">LinkedIn Bio (Optional)</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Paste your LinkedIn bio to help AI capture your personal brand."
                                    className="min-h-[100px] rounded-xl"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200 rounded-xl mt-4"
                >
                    {isLoading ? (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                        <>
                            Complete Setup
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                    )}
                </Button>
            </form>
        </Form>
    )
}
