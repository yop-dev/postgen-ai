import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"

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
        cta: "Go Pro",
        href: "/sign-up",
        popular: true,
    },
]

export function Pricing() {
    return (
        <section id="pricing" className="py-24">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                    <h2 className="text-slate-700 font-bold uppercase tracking-wider text-sm">Pricing</h2>
                    <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                        Simple, transparent pricing
                    </h3>
                    <p className="text-lg text-slate-600">
                        Start free and upgrade as you grow. No hidden fees.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative flex flex-col p-8 rounded-3xl border ${plan.popular
                                ? "border-slate-900 shadow-2xl scale-105 z-10 bg-white"
                                : "border-slate-200 bg-white shadow-lg"
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h4 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h4>
                                <p className="text-slate-500">{plan.description}</p>
                            </div>

                            <div className="mb-8 flex items-baseline gap-1">
                                <span className="text-4xl font-extrabold text-slate-900">${plan.price}</span>
                                <span className="text-slate-500 font-medium">/month</span>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {plan.features.map((feature, fIndex) => (
                                    <li key={fIndex} className="flex items-start gap-3 text-slate-600">
                                        <div className="mt-1 bg-slate-100 rounded-full p-0.5">
                                            <Check className="h-4 w-4 text-slate-700" />
                                        </div>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link href={plan.href} className="w-full">
                                <Button
                                    className={`w-full h-12 text-lg font-bold transition-all ${plan.popular
                                        ? "bg-slate-900 hover:bg-slate-800 shadow-lg shadow-slate-200"
                                        : "bg-slate-900 hover:bg-slate-800"
                                        }`}
                                >
                                    {plan.cta}
                                </Button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
