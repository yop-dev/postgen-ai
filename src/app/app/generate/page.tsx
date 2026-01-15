import { GeneratorForm } from "@/components/generator/generator-form"

export default function GeneratePage() {
    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-10">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                    Create something <span className="text-blue-600">amazing</span>
                </h1>
                <p className="text-lg text-slate-500 max-w-xl mx-auto">
                    Describe your topic, pick an objective, and let AI generate 3 unique
                    LinkedIn post variants with previews.
                </p>
            </div>

            <GeneratorForm />

            <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100 flex items-start gap-4">
                <div className="bg-blue-600 p-2 rounded-lg text-white"> ✨ </div>
                <div>
                    <h4 className="font-bold text-blue-900">Pro Tip</h4>
                    <p className="text-sm text-blue-700/80 leading-relaxed mt-1">
                        Be specific with your topic. Instead of "Marketing", try "The transition from
                        traditional PR to digital content strategy for small businesses."
                    </p>
                </div>
            </div>
        </div>
    )
}
