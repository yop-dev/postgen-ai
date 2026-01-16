"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const plans = [
    {
        name: "Free",
        price: "0",
        description: "Perfect for testing the waters",
        features: [
            "3 lifetime generations",
            "Caption generation (3 variants)",
            "512x512 AI images",
            "Realistic LinkedIn preview",
        ],
        cta: "Start Free",
        href: "/sign-up",
        popular: false,
    },
    {
        name: "Pro",
        price: "15",
        description: "For serious content creators",
        features: [
            "Unlimited generations",
            "Caption generation (3 variants)",
            "1024x1024 high-res AI images",
            "Full generation history",
            "Regenerate captions & images",
            "Priority AI processing",
        ],
        cta: "Upgrade to Pro",
        href: "/sign-up",
        popular: true,
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

export function Pricing() {
    return (
        <section id="pricing" className="py-24 bg-slate-950">
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center max-w-2xl mx-auto mb-16 space-y-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                >
                    <motion.h2 variants={itemVariants} className="text-slate-300 font-bold uppercase tracking-wider text-sm">Pricing</motion.h2>
                    <motion.h3 variants={itemVariants} className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                        Simple, transparent pricing
                    </motion.h3>
                    <motion.p variants={itemVariants} className="text-lg text-slate-400">
                        Start free and upgrade as you grow. No hidden fees.
                    </motion.p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                >
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className={`relative p-8 rounded-2xl border ${plan.popular
                                ? "bg-slate-900/70 border-slate-700 shadow-2xl shadow-slate-900/50"
                                : "bg-slate-900/50 border-slate-800"
                                } transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/50`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-slate-700 to-slate-800 text-white text-sm font-semibold rounded-full border border-slate-600">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                <p className="text-slate-400 text-sm">{plan.description}</p>
                            </div>

                            <div className="mb-6">
                                <span className="text-5xl font-extrabold text-white">${plan.price}</span>
                                <span className="text-slate-400 ml-2">/month</span>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-start gap-3">
                                        <Check className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
                                        <span className="text-slate-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link href={plan.href} className="block">
                                <Button
                                    className={`w-full ${plan.popular
                                        ? "bg-white hover:bg-slate-100 text-slate-900"
                                        : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                                        }`}
                                    size="lg"
                                >
                                    {plan.cta}
                                </Button>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
