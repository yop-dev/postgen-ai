import { currentUser } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { UpgradeButton } from "@/components/upgrade-button"
import { Sparkles, History, Zap, ArrowRight, LayoutDashboard } from "lucide-react"
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
                        Welcome back, {clerkUser?.firstName || "Creator"}! 👋
                    </h1>
                    <p className="text-lg text-slate-500 mt-2">
                        Ready to craft your next viral LinkedIn post?
                    </p>
                </div>
                <div className="flex gap-3">
                    <UpgradeButton isPro={isPro} />
                    <Link href="/app/generate">
                        <Button size="lg" className="h-12 px-6 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 group">
                            <Sparkles className="mr-2 h-4 w-4" />
                            Generate New Post
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-all">
                    <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Zap className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">
                        {isPro ? "Unlimited Generations" : "Generations Left"}
                    </h3>
                    <div className="flex items-baseline gap-2 mt-2">
                        {isPro ? (
                            <span className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">∞</span>
                        ) : (
                            <>
                                <span className="text-4xl font-black text-blue-600">{Math.max(0, 3 - currentUsage)}</span>
                                <span className="text-slate-400 font-medium">/ 3</span>
                            </>
                        )}
                    </div>
                    <p className="text-sm text-slate-500 mt-2">
                        {isPro ? "Pro plan - no limits!" : "Free plan refills monthly"}
                    </p>
                </div>

                <div className="group bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-all">
                    <div className="h-12 w-12 rounded-2xl bg-violet-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <History className="h-6 w-6 text-violet-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Total Posts</h3>
                    <span className="text-4xl font-black text-slate-900 mt-2 block">{totalPosts}</span>
                    <p className="text-sm text-slate-500 mt-2">Across all time</p>
                </div>

                <div className="group bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-all">
                    <div className="h-12 w-12 rounded-2xl bg-orange-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <LayoutDashboard className="h-6 w-6 text-orange-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Active Plan</h3>
                    <span className={`text-4xl font-black mt-2 block capitalize ${isPro ? 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent' : 'text-slate-900'}`}>
                        {isPro ? "Pro" : "Free"}
                    </span>
                    {isPro ? (
                        <p className="text-sm text-slate-500 mt-2">Unlimited generations</p>
                    ) : (
                        <Link href="/app/billing" className="text-sm text-blue-600 font-bold hover:underline mt-2 inline-block">
                            Upgrade for Unlimited
                        </Link>
                    )}
                </div>
            </div>

            {/* Quick Start Section */}
            <div className="relative overflow-hidden bg-slate-900 rounded-[2rem] p-10 md:p-16 text-white text-center space-y-8">
                {/* Background blobs */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-600/20 blur-[100px] rounded-full translate-x-1/2 translate-y-1/2" />

                <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                        Stop the scroll <br />
                        <span className="text-blue-500">with PostGen AI</span>
                    </h2>
                    <p className="text-lg text-slate-400">
                        Create professional, high-converting LinkedIn content in seconds.
                        Choose your topic, set your tone, and let AI do the rest.
                    </p>
                    <div className="pt-4">
                        <Link href="/app/generate">
                            <Button size="lg" className="h-14 px-10 text-lg font-bold bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/20 group">
                                <Sparkles className="mr-2 h-5 w-5" />
                                Start Generating Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
