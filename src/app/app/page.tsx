import { currentUser } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { UpgradeButton } from "@/components/upgrade-button"
import { Sparkles, History, Zap, ArrowRight, LayoutDashboard, Crown } from "lucide-react"
import Link from "next/link"

export default async function AppDashboard() {
    const clerkUser = await currentUser()

    if (!clerkUser) {
        return null
    }

    // Get user from database to check plan
    let user = await db.user.findUnique({
        where: { clerkId: clerkUser.id },
        include: { usage: true }
    })

    // Fallback: Create user if they don't exist (webhook might have failed)
    if (!user) {
        user = await db.user.create({
            data: {
                clerkId: clerkUser.id,
                email: clerkUser.emailAddresses[0].emailAddress,
                usage: {
                    create: {
                        lifetimeCount: 0,
                    },
                },
            },
            include: { usage: true }
        })
    }

    const isPro = user?.plan === "PRO"
    const currentUsage = user?.usage?.lifetimeCount || 0

    // Get total posts count - only if user exists in DB
    const totalPosts = user?.id
        ? await db.generation.count({
            where: { userId: user.id }
        })
        : 0

    return (
        <div className="space-y-10 pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-white tracking-tight">
                        Welcome back, {clerkUser?.firstName || "Creator"}!
                    </h1>
                    <p className="text-lg text-slate-400 mt-2">
                        Ready to craft your next viral LinkedIn post?
                    </p>
                </div>
                <div className="flex gap-3">
                    {/* Header Actions if needed */}
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 rounded-2xl border border-slate-800 p-6 shadow-sm hover:shadow-md hover:border-slate-700 transition-all">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20">
                        <Zap className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-sm font-medium text-slate-400">
                        {isPro ? "Unlimited Generations" : "Generations Left"}
                    </h3>
                    <div className="mt-2">
                        {isPro ? (
                            <span className="text-4xl font-bold text-white">∞</span>
                        ) : (
                            <>
                                <span className="text-4xl font-bold text-white">{Math.max(0, 3 - currentUsage)}</span>
                                <span className="text-slate-500 font-medium ml-1">/ 3</span>
                            </>
                        )}
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                        {isPro ? "Pro plan - no limits!" : "Free plan refills monthly"}
                    </p>
                </div>

                <div className="group bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 rounded-2xl border border-slate-800 p-6 shadow-sm hover:shadow-md hover:border-slate-700 transition-all">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/20">
                        <History className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-sm font-medium text-slate-400">Total Posts</h3>
                    <span className="text-4xl font-bold text-white mt-2 block">{totalPosts}</span>
                    <p className="text-xs text-slate-500 mt-2">Across all time</p>
                </div>

                <div className="group bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 rounded-2xl border border-slate-800 p-6 shadow-sm hover:shadow-md hover:border-slate-700 transition-all">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mb-4 shadow-lg shadow-amber-500/20">
                        <Crown className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-sm font-medium text-slate-400">Active Plan</h3>
                    <span className="text-4xl font-bold text-white mt-2 block capitalize">
                        {isPro ? "Pro" : "Free"}
                    </span>
                    {isPro ? (
                        <p className="text-xs text-slate-500 mt-2">Unlimited generations</p>
                    ) : (
                        <Link href="/app/billing" className="text-xs text-white font-semibold hover:underline mt-2 inline-block">
                            Upgrade for Unlimited
                        </Link>
                    )}
                </div>
            </div>

            {/* Quick Start Section */}
            <div className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border border-slate-800 rounded-2xl overflow-hidden p-10 md:p-16 text-center shadow-sm">
                {/* Video Background */}
                <div className="absolute inset-0 z-0">
                    <video
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                    >
                        <source src="/hero-bg-2-cropped.mp4" type="video/mp4" />
                    </video>
                    {/* Dark overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/85 to-slate-950/90" />
                </div>

                <div className="relative max-w-2xl mx-auto space-y-6 z-10">
                    <h2 className="text-3xl font-bold tracking-tight text-white">
                        See your LinkedIn post <br />
                        before the world does.
                    </h2>
                    <p className="text-slate-400">
                        Create professional, high-converting LinkedIn content in seconds.
                        Choose your topic, set your tone, and let AI do the rest.
                    </p>
                    <div className="pt-4">
                        <Link href="/app/generate">
                            <Button size="lg" className="h-12 px-8 bg-white hover:bg-slate-200 text-slate-900 shadow-none rounded-full font-medium">
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
