"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
        },
    },
}

export function CTA() {
    return (
        <section className="py-24 bg-slate-900 overflow-hidden relative">
            {/* Decorative blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-slate-700/20 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-800/20 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    className="max-w-4xl mx-auto text-center space-y-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                >
                    <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/10 text-slate-400 text-sm font-medium border border-slate-500/20">
                        <Sparkles className="h-4 w-4" />
                        <span>Ready to shine?</span>
                    </motion.div>

                    <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
                        Stop scrolling. <br />
                        <span className="text-slate-400">Start standing out.</span>
                    </motion.h2>

                    <motion.p variants={itemVariants} className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Join other creators who use InFrame to craft professional,
                        high-converting LinkedIn content in seconds.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Link href="/sign-up">
                            <Button size="lg" className="h-12 px-8 text-base font-semibold bg-white hover:bg-slate-100 text-slate-900 shadow-lg group">
                                Get Started Free
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </motion.div>

                    <motion.p variants={itemVariants} className="text-sm text-slate-500">
                        No credit card required • Free forever plan available
                    </motion.p>
                </motion.div>
            </div>
        </section>
    )
}
