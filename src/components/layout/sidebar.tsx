"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserButton } from "@clerk/nextjs"
import {
    LayoutDashboard,
    Sparkles,
    History,
    CreditCard,
    Settings,
    ChevronLeft,
    ChevronRight,
    Crown
} from "lucide-react"
import NextImage from "next/image"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const navItems = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/app",
        color: "text-sky-500",
    },
    {
        label: "Generate Post",
        icon: Sparkles,
        href: "/app/generate",
        color: "text-violet-500",
    },
    {
        label: "History",
        icon: History,
        href: "/app/history",
        color: "text-pink-700",
    },
    {
        label: "Billing",
        icon: CreditCard,
        href: "/app/billing",
        color: "text-orange-700",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/app/settings",
    },
]

interface SidebarProps {
    isPro?: boolean
    currentUsage?: number
}

export function Sidebar({ isPro = false, currentUsage = 0 }: SidebarProps) {
    const pathname = usePathname()
    const [isCollapsed, setIsCollapsed] = useState(false)

    const remainingGenerations = Math.max(0, 3 - currentUsage)

    return (
        <div className={cn(
            "relative flex flex-col h-full bg-white border-r border-slate-200 transition-all duration-300 shadow-sm",
            isCollapsed ? "w-20" : "w-72"
        )}>
            {/* Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-10 h-6 w-6 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm hover:bg-slate-50 transition-colors z-10"
            >
                {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>

            {/* Logo */}
            <div className={cn(
                "p-6 mb-2 flex items-center gap-3",
                isCollapsed && "justify-center px-0"
            )}>
                <Link href="/app" className="flex items-center gap-3 group">
                    <div className="relative h-10 w-10 min-w-10 rounded-xl overflow-hidden shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
                        <NextImage
                            src="/postgen-logo.jpg"
                            alt="PostGen AI Logo"
                            fill
                            className="object-cover"
                        />
                    </div>
                    {!isCollapsed && (
                        <span className="text-xl font-bold text-slate-800 tracking-tight">PostGen AI</span>
                    )}
                </Link>
            </div>

            {/* Navigation */}
            <div className="flex-1 px-4 space-y-2 py-4">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 px-3 py-3 rounded-xl transition-all group",
                            pathname === item.href
                                ? "bg-blue-50 text-blue-700 font-semibold"
                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                        )}
                        title={isCollapsed ? item.label : ""}
                    >
                        <item.icon className={cn(
                            "h-5 w-5 transition-colors",
                            pathname === item.href ? "text-blue-700" : item.color || "text-slate-500",
                            !isCollapsed && "group-hover:scale-110"
                        )} />
                        {!isCollapsed && <span>{item.label}</span>}
                    </Link>
                ))}
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                {!isCollapsed && (
                    isPro ? (
                        <div className="mb-4 p-4 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <Crown className="h-4 w-4" />
                                <p className="text-xs font-medium uppercase tracking-wider">Pro Plan</p>
                            </div>
                            <h4 className="font-bold mb-2">Unlimited Access</h4>
                            <p className="text-[10px] opacity-90">Generate as many posts as you want!</p>
                            <Link href="/app/billing">
                                <Button variant="secondary" size="sm" className="w-full mt-4 bg-white text-purple-600 hover:bg-purple-50 font-bold border-none shadow-sm">
                                    Manage Subscription
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="mb-4 p-4 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-200">
                            <p className="text-xs font-medium opacity-80 uppercase tracking-wider mb-1">Current Plan</p>
                            <h4 className="font-bold mb-3">Free Tier</h4>
                            <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden mb-2">
                                <div className="h-full bg-white transition-all" style={{ width: `${(currentUsage / 3) * 100}%` }} />
                            </div>
                            <p className="text-[10px] opacity-90">{currentUsage}/3 free posts used</p>
                            <Link href="/app/billing">
                                <Button variant="secondary" size="sm" className="w-full mt-4 bg-white text-blue-600 hover:bg-blue-50 font-bold border-none shadow-sm">
                                    Upgrade to Pro
                                </Button>
                            </Link>
                        </div>
                    )
                )}

                <div className={cn(
                    "flex items-center gap-3 p-2",
                    isCollapsed ? "justify-center" : "justify-between"
                )}>
                    <div className="flex items-center gap-3 overflow-hidden">
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "h-10 w-10"
                                }
                            }}
                        />
                        {!isCollapsed && (
                            <div className="flex flex-col truncate">
                                <p className="text-sm font-bold text-slate-900 truncate">My Account</p>
                                <p className="text-xs text-slate-500 truncate">User Profile</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
