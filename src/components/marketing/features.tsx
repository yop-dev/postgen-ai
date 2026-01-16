"use client"

import { Zap, Camera, Eye, MousePointer2 } from "lucide-react"
import { motion } from "framer-motion"

const features = [
    {
        title: "AI-Powered Captions",
        description: "Generate 3 unique variants in seconds. From professional to casual, we cover every tone.",
        icon: Zap,
        color: "bg-slate-700",
    },
    {
        title: "Professional Images",
        description: "Integrated DALL·E 3 generated visuals tailored to your post topic and objective.",
        icon: Camera,
        color: "bg-slate-800",
    },
    {
        title: "Realistic Preview",
        description: "See exactly how your post will look on LinkedIn before you publish. No more formatting surprises.",
        icon: Eye,
        color: "bg-slate-600",
    },
    {
        title: "One-Click Workflow",
        description: "Copy captions and download images instantly. Ready to paste and publish in record time.",
        icon: MousePointer2,
        color: "bg-slate-900",
    },
]

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

export function Features() {
    return (
        <section id="features" className="py-24 bg-slate-950">
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center max-w-2xl mx-auto mb-16 space-y-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                >
                    <motion.h2 variants={itemVariants} className="text-slate-300 font-bold uppercase tracking-wider text-sm">Features</motion.h2>
                    <motion.h3 variants={itemVariants} className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                        Everything you need to <br className="hidden md:block" />
                        <span className="text-slate-300">
                            stand out on LinkedIn
                        </span>
                    </motion.h3>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="group p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/50"
                        >
                            <div className={`${feature.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                <feature.icon className="h-6 w-6 text-white" />
                            </div>
                            <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                            <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
