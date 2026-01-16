import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { UpgradeButton } from "@/components/upgrade-button"
import { Crown, Check } from "lucide-react"

export default async function BillingPage() {
    const { userId } = await auth()

    // Get user plan
    const user = await db.user.findUnique({
        where: { clerkId: userId! },
        include: { usage: true }
    })

    const isPro = user?.plan === "PRO"
    const currentUsage = user?.usage?.lifetimeCount || 0

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white">Billing & Subscription</h1>
                <p className="text-slate-400 mt-2">Manage your plan and payment methods</p>
            </div>

            {/* Current Plan */}
            <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Current Plan</h2>
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            {isPro && <Crown className="h-6 w-6 text-white" />}
                            <p className="text-2xl font-bold text-white">
                                {isPro ? "Pro Plan" : "Free Plan"}
                            </p>
                        </div>
                        <p className="text-slate-400 mt-1">
                            {isPro ? "Unlimited generations" : `${currentUsage}/3 generations used`}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-bold text-white">${isPro ? "15" : "0"}</p>
                        <p className="text-sm text-slate-400">per month</p>
                    </div>
                </div>
            </div>

            {/* Upgrade to Pro or Manage Subscription */}
            {isPro ? (
                <div className="bg-slate-900 rounded-lg p-6 text-white shadow-sm border border-slate-800">
                    <div className="flex items-center gap-2 mb-2">
                        <Crown className="h-6 w-6 text-white" />
                        <h2 className="text-2xl font-bold">Pro Subscription Active</h2>
                    </div>
                    <p className="text-slate-400 mb-6">You have unlimited access to all features!</p>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-400">Billed monthly</p>
                            <p className="text-3xl font-bold mt-1">$15/month</p>
                        </div>
                        <UpgradeButton isPro={isPro} />
                    </div>
                </div>
            ) : (
                <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
                    <h2 className="text-2xl font-bold text-white mb-2">Upgrade to Pro</h2>
                    <p className="text-slate-400 mb-6">Unlock unlimited generations and premium features</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div className="flex items-start gap-3">
                            <div className="h-5 w-5 rounded-full bg-slate-800 flex items-center justify-center mt-0.5">
                                <Check className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-slate-300">Unlimited generations</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="h-5 w-5 rounded-full bg-slate-800 flex items-center justify-center mt-0.5">
                                <Check className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-slate-300">High-res images (1024×1024)</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="h-5 w-5 rounded-full bg-slate-800 flex items-center justify-center mt-0.5">
                                <Check className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-slate-300">Full history</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="h-5 w-5 rounded-full bg-slate-800 flex items-center justify-center mt-0.5">
                                <Check className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-slate-300">Regenerate captions & images</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-800 pt-6">
                        <div>
                            <p className="text-3xl font-bold text-white">$15</p>
                            <p className="text-slate-400 text-sm">per month</p>
                        </div>
                        <UpgradeButton isPro={isPro} />
                    </div>
                </div>
            )}
        </div>
    )
}
