import { OnboardingForm } from "@/components/auth/onboarding-form"
import { Sparkles } from "lucide-react"

export default function OnboardingPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-20">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center space-y-4">
                    <div className="h-16 w-16 bg-blue-600 rounded-[1.5rem] flex items-center justify-center mx-auto shadow-xl shadow-blue-200">
                        <Sparkles className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        Let's personalize your <br />
                        <span className="text-blue-600">PostGen</span> experience
                    </h1>
                    <p className="text-slate-500">
                        A few details will help us generate more relevant posts for your personal brand.
                    </p>
                </div>

                <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                    <OnboardingForm />
                </div>

                <p className="text-center text-sm text-slate-400">
                    You can always change these settings later.
                </p>
            </div>
        </div>
    )
}
