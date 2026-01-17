import { Sidebar } from "@/components/layout/sidebar"
import { MobileNav } from "@/components/layout/mobile-nav"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"

export default async function AppLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { userId } = await auth()

    // Get user plan and usage
    let isPro = false
    let currentUsage = 0

    if (userId) {
        const user = await db.user.findUnique({
            where: { clerkId: userId },
            include: { usage: true }
        })
        isPro = user?.plan === "PRO"
        currentUsage = user?.usage?.lifetimeCount || 0
    }

    return (
        <div className="flex h-screen overflow-hidden bg-slate-950 font-sans">
            {/* Desktop Sidebar - Hidden on mobile */}
            <Sidebar isPro={isPro} currentUsage={currentUsage} className="hidden md:flex" />

            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Mobile Header (Hidden on Laptop) */}
                <MobileNav isPro={isPro} currentUsage={currentUsage} />
                {/* Main Content with Gradient Overlay */}
                <main className="relative flex-1 overflow-auto">
                    {/* Gradient Overlay - similar to video effect */}
                    <div className="fixed inset-0 pointer-events-none z-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 via-purple-500/5 to-purple-500/15" />
                        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-blue-400/20 to-transparent blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-purple-400/20 to-transparent blur-3xl" />
                    </div>

                    <div className="relative z-10 container mx-auto p-6 md:p-10 min-h-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
