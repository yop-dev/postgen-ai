"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

export function Hero() {
    return (
        <section className="relative min-h-screen overflow-hidden bg-slate-950">
            {/* Background Video - Exact same approach as portfolio */}
            <div className="absolute inset-0 z-0">
                <video
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                >
                    <source src="/hero-bg-1.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 to-slate-950/70" />
            </div>

            <div className="container relative z-20 mx-auto px-6 py-16 md:py-24">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-6 text-white">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-sm font-medium backdrop-blur-sm">
                            <Sparkles className="h-4 w-4 text-slate-400" />
                            <span className="text-slate-300">AI-Powered LinkedIn Post Preview</span>
                        </div>

                        {/* Headline */}
                        <div className="space-y-3">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
                                Power up<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">
                                    your brand
                                </span>
                            </h1>
                            <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
                                Generate professional LinkedIn posts in seconds. AI-powered captions and visuals
                                that stop the scroll and drive engagement.
                            </p>
                        </div>

                        {/* CTA */}
                        <div className="flex flex-col sm:flex-row gap-4 items-start">
                            <Link href="/sign-up">
                                <Button size="lg" className="h-12 px-6 text-base font-semibold bg-white hover:bg-slate-100 text-slate-900 shadow-lg group">
                                    Get Started Free
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </div>

                        {/* Social Proof */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-2 text-sm text-slate-400">
                            <span>Free to start</span>
                            <span className="hidden sm:block">•</span>
                            <span>No credit card required</span>
                        </div>
                    </div>

                    {/* Right - LinkedIn Preview Mockup */}
                    <div className="relative">
                        {/* Mockup Preview */}
                        <div className="relative rounded-2xl border border-slate-700 bg-slate-900/30 p-4 shadow-2xl backdrop-blur-sm">
                            <div className="rounded-xl border border-slate-700 bg-slate-800/50 overflow-hidden aspect-video flex items-center justify-center">
                                <div className="text-slate-400 text-center space-y-4">
                                    <div className="h-12 w-12 rounded-full bg-slate-700 mx-auto animate-pulse" />
                                    <div className="space-y-2">
                                        <div className="h-4 w-48 bg-slate-700 rounded animate-pulse" />
                                        <div className="h-4 w-32 bg-slate-700 rounded animate-pulse mx-auto" />
                                    </div>
                                    <p className="text-sm font-medium">Interactive LinkedIn Preview Mockup coming soon...</p>
                                </div>
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-xl border border-slate-200 p-4 rotate-3">
                            <div className="flex items-center gap-3">
                                <div className="bg-slate-900 p-2 rounded-lg">
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
