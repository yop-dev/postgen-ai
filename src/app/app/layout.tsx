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

                <main className="flex-1 overflow-y-auto overflow-x-hidden relative h-full">
                    <div className="max-w-7xl mx-auto p-4 md:p-8 min-h-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
