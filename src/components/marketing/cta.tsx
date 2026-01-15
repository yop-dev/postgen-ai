import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

export function CTA() {
    return (
        <section className="py-24 bg-slate-900 overflow-hidden relative">
            {/* Decorative blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium border border-blue-500/20">
                        <Sparkles className="h-4 w-4" />
                        <span>Ready to shine?</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
                        Stop scrolling. <br />
                        <span className="text-blue-500">Start standing out.</span>
                    </h2>

                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Join other creators who use PostGen AI to craft professional,
                        high-converting LinkedIn content in seconds.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Link href="/sign-up">
                            <Button size="lg" className="h-14 px-10 text-lg font-bold bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/20 group">
                                Create Your First Post Free
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>

                    <p className="text-slate-500 text-sm">
                        3 free generations • No credit card required • Instant access
                    </p>
                </div>
            </div>
        </section>
    )
}
