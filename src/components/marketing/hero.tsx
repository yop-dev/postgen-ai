import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react"

export function Hero() {
    return (
        <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-1/2 -z-10 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-blue-50/50 [mask-image:radial-gradient(closest-side,white,transparent)]" />
            <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] bg-indigo-50/30 blur-3xl" />

            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium border border-blue-100 animate-in fade-in slide-in-from-bottom-3 duration-1000">
                        <Sparkles className="h-4 w-4" />
                        <span>AI-Powered LinkedIn Post Preview</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both delay-100">
                        Preview your LinkedIn post <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                            before you publish it
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-xl text-slate-600 max-w-2xl animate-in fade-in slide-in-from-bottom-5 duration-1000 fill-mode-both delay-200">
                        Generate 3 unique caption variants and professional images in seconds.
                        See exactly how your post will look on LinkedIn and stop the scroll.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 items-center animate-in fade-in slide-in-from-bottom-6 duration-1000 fill-mode-both delay-300">
                        <Link href="/sign-up">
                            <Button size="lg" className="h-14 px-8 text-lg font-semibold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 hover:shadow-xl transition-all group">
                                Start Creating Free
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link href="#features">
                            <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-semibold border-slate-200 hover:bg-slate-50 transition-all">
                                Learn How It Works
                            </Button>
                        </Link>
                    </div>

                    {/* Social Proof / Features */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 animate-in fade-in duration-1000 fill-mode-both delay-500">
                        <div className="flex items-center gap-2 text-slate-500">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            <span className="text-sm font-medium">3 Lifetime Generations Free</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            <span className="text-sm font-medium">No Credit Card Required</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            <span className="text-sm font-medium">AI Images Included</span>
                        </div>
                    </div>

                    {/* Mockup Preview Placeholder */}
                    <div className="relative mt-16 w-full max-w-5xl rounded-2xl border border-slate-200 bg-white/50 p-4 shadow-2xl backdrop-blur-sm animate-in fade-in zoom-in-95 duration-1000 fill-mode-both delay-700">
                        <div className="rounded-xl border border-slate-200 bg-slate-50 overflow-hidden aspect-video flex items-center justify-center">
                            <div className="text-slate-400 text-center space-y-4">
                                <div className="h-12 w-12 rounded-full bg-slate-200 mx-auto animate-pulse" />
                                <div className="space-y-2">
                                    <div className="h-4 w-48 bg-slate-200 rounded animate-pulse" />
                                    <div className="h-4 w-32 bg-slate-200 rounded animate-pulse mx-auto" />
                                </div>
                                <p className="text-sm font-medium">Interactive LinkedIn Preview Mockup coming soon...</p>
                            </div>
                        </div>
                        {/* Dynamic Badge Over Mockup */}
                        <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-white rounded-lg shadow-xl border border-blue-100 p-4 rotate-3 animate-bounce">
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-600 p-2 rounded-lg">
                                    <Sparkles className="h-5 w-5 text-white" />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">New</p>
                                    <p className="text-sm font-bold text-slate-900">DALL·E 3 Visuals</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
