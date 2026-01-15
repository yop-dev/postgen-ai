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
                <h1 className="text-3xl font-bold text-gray-900">Billing & Subscription</h1>
                <p className="text-gray-600 mt-2">Manage your plan and payment methods</p>
            </div>

            {/* Current Plan */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Plan</h2>
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            {isPro && <Crown className="h-6 w-6 text-purple-600" />}
                            <p className={`text-2xl font-bold ${isPro ? 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent' : 'text-gray-900'}`}>
                                {isPro ? "Pro Plan" : "Free Plan"}
                            </p>
                        </div>
                        <p className="text-gray-600 mt-1">
                            {isPro ? "Unlimited generations" : `${currentUsage}/3 generations used`}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-bold text-gray-900">${isPro ? "15" : "0"}</p>
                        <p className="text-sm text-gray-500">per month</p>
                    </div>
                </div>
            </div>

            {/* Upgrade to Pro or Manage Subscription */}
            {isPro ? (
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg p-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                        <Crown className="h-6 w-6" />
                        <h2 className="text-2xl font-bold">Pro Subscription Active</h2>
                    </div>
                    <p className="text-purple-100 mb-6">You have unlimited access to all features!</p>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-purple-100">Billed monthly</p>
                            <p className="text-3xl font-bold mt-1">$15/month</p>
                        </div>
                        <UpgradeButton isPro={isPro} />
                    </div>
                </div>
            ) : (
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg p-6 text-white">
                    <h2 className="text-2xl font-bold mb-2">Upgrade to Pro</h2>
                    <p className="text-blue-100 mb-4">Unlock unlimited generations and premium features</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-start gap-2">
                            <Check className="w-5 h-5 mt-0.5" />
                            <span>Unlimited generations</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <Check className="w-5 h-5 mt-0.5" />
                            <span>High-res images (1024×1024)</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <Check className="w-5 h-5 mt-0.5" />
                            <span>Full history</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <Check className="w-5 h-5 mt-0.5" />
                            <span>Regenerate captions & images</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-3xl font-bold">$15</p>
                            <p className="text-blue-100 text-sm">per month</p>
                        </div>
                        <UpgradeButton isPro={isPro} />
                    </div>
                </div>
            )}
        </div>
    )
}
