import { GeneratorForm } from "@/components/generator/generator-form"

export default function GeneratePage() {
    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-10">
            <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                    Create something <span className="italic underline decoration-blue-400 decoration-2 underline-offset-4">amazing</span>
                </h1>
                <p className="text-sm text-slate-400">
                    Describe your topic, pick an objective, and let AI generate up to 3 unique LinkedIn post variants with previews.
                </p>
            </div>

            <GeneratorForm />

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
                <h4 className="font-bold text-white">Pro Tip</h4>
                <p className="text-sm text-slate-400 leading-relaxed mt-1">
                    Be specific with your topic. Instead of "Marketing", try "The transition from
                    traditional PR to digital content strategy for small businesses."
                </p>
            </div>
        </div>
    )
}
