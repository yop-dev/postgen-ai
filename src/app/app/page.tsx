import { currentUser } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { UpgradeButton } from "@/components/upgrade-button"
import { Sparkles, History, Zap, ArrowRight, LayoutDashboard, Crown } from "lucide-react"
import Link from "next/link"

export default async function AppDashboard() {
    const clerkUser = await currentUser()

    // Get user from database to check plan
    const user = await db.user.findUnique({
        where: { clerkId: clerkUser?.id },
        include: { usage: true }
    })

    const isPro = user?.plan === "PRO"
    const currentUsage = user?.usage?.lifetimeCount || 0

    // Get total posts count
    const totalPosts = await db.generation.count({
        where: { userId: user?.id }
    })

    return (
        <div className="space-y-10 pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                        Welcome back, {clerkUser?.firstName || "Creator"}!
                    </h1>
                    <p className="text-lg text-slate-500 mt-2">
                        Ready to craft your next viral LinkedIn post?
                    </p>
                </div>
                <div className="flex gap-3">
                    {/* Header Actions if needed */}
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm hover:shadow-md transition-all">
                    <div className="h-10 w-10 rounded-lg bg-slate-50 flex items-center justify-center mb-4">
                        <Zap className="h-5 w-5 text-slate-900" />
                    </div>
                    <h3 className="text-sm font-medium text-slate-500">
                        {isPro ? "Unlimited Generations" : "Generations Left"}
                    </h3>
                    <div className="mt-2">
                        {isPro ? (
                            <span className="text-4xl font-bold text-slate-900">∞</span>
                        ) : (
                            <>
                                <span className="text-4xl font-bold text-slate-900">{Math.max(0, 3 - currentUsage)}</span>
                                <span className="text-slate-400 font-medium ml-1">/ 3</span>
                            </>
                        )}
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                        {isPro ? "Pro plan - no limits!" : "Free plan refills monthly"}
                    </p>
                </div>

                <div className="group bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm hover:shadow-md transition-all">
                    <div className="h-10 w-10 rounded-lg bg-slate-50 flex items-center justify-center mb-4">
                        <History className="h-5 w-5 text-slate-900" />
                    </div>
                    <h3 className="text-sm font-medium text-slate-500">Total Posts</h3>
                    <span className="text-4xl font-bold text-slate-900 mt-2 block">{totalPosts}</span>
                    <p className="text-xs text-slate-400 mt-2">Across all time</p>
                </div>

                <div className="group bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm hover:shadow-md transition-all">
                    <div className="h-10 w-10 rounded-lg bg-slate-50 flex items-center justify-center mb-4">
                        <Crown className="h-5 w-5 text-slate-900" />
                    </div>
                    <h3 className="text-sm font-medium text-slate-500">Active Plan</h3>
                    <span className="text-4xl font-bold text-slate-900 mt-2 block capitalize">
                        {isPro ? "Pro" : "Free"}
                    </span>
                    {isPro ? (
                        <p className="text-xs text-slate-400 mt-2">Unlimited generations</p>
                    ) : (
                        <Link href="/app/billing" className="text-xs text-slate-900 font-semibold hover:underline mt-2 inline-block">
                            Upgrade for Unlimited
                        </Link>
                    )}
                </div>
            </div>

            {/* Quick Start Section */}
            <div className="relative bg-white border border-slate-200/60 rounded-2xl p-10 md:p-16 text-center shadow-sm">
                <div className="max-w-2xl mx-auto space-y-6">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                        Stop the scroll <br />
                        with PostGen AI
                    </h2>
                    <p className="text-slate-500">
                        Create professional, high-converting LinkedIn content in seconds.
                        Choose your topic, set your tone, and let AI do the rest.
                    </p>
                    <div className="pt-4">
                        <Link href="/app/generate">
                            <Button size="lg" className="h-12 px-8 bg-slate-900 hover:bg-slate-800 text-white shadow-none rounded-full font-medium">
                                <Sparkles className="mr-2 h-4 w-4" />
                                Start Generating Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
