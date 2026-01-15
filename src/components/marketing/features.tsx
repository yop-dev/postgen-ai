import { Zap, Camera, Eye, MousePointer2 } from "lucide-react"

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

export function Features() {
    return (
        <section id="features" className="py-24 bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                    <h2 className="text-slate-700 font-bold uppercase tracking-wider text-sm">Features</h2>
                    <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                        Everything you need to <br className="hidden md:block" />
                        <span className="text-slate-700">
                            stand out on LinkedIn
                        </span>
                    </h3>
                    <p className="text-lg text-slate-600">
                        Stop guessing and start creating high-impact content that resonates with your audience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300"
                        >
                            <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-slate-200 group-hover:scale-110 transition-transform`}>
                                <feature.icon className="h-6 w-6 text-white" />
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-700 transition-colors">
                                {feature.title}
                            </h4>
                            <p className="text-slate-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
