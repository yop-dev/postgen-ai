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
    className?: string
    onNavigate?: () => void
}

export function Sidebar({ isPro = false, currentUsage = 0, className, onNavigate }: SidebarProps) {
    const pathname = usePathname()
    const [isCollapsed, setIsCollapsed] = useState(false)

    const remainingGenerations = Math.max(0, 3 - currentUsage)

    return (
        <div className={cn(
            "relative flex flex-col h-full bg-slate-950 border-r border-slate-800 transition-all duration-300 shadow-sm",
            isCollapsed ? "w-20" : "w-72",
            className
        )}>
            {/* Toggle Button */}
            {!className && (
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="cursor-pointer absolute -right-3 top-10 h-6 w-6 bg-slate-900 border border-slate-700 rounded-full flex items-center justify-center shadow-sm hover:bg-slate-800 transition-colors z-10"
                >
                    {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </button>
            )}

            {/* Logo */}
            <div className={cn(
                "p-6 mb-2 flex items-center gap-3",
                isCollapsed && "justify-center px-0"
            )}>
                <Link href="/app" className="flex items-center gap-3 group">
                    <div className="relative h-8 w-8 min-w-8 overflow-hidden transition-transform">
                        <NextImage
                            src="/post-gen-logov2.jpg"
                            alt="PostGen AI Logo"
                            fill
                            className="object-cover"
                        />
                    </div>
                    {!isCollapsed && (
                        <span className="text-xl font-bold text-white tracking-tight">PostGen AI</span>
                    )}
                </Link>
            </div>

            {/* Navigation */}
            <div className="flex-1 px-4 space-y-1 py-4">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={onNavigate}
                        className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group",
                            pathname === item.href
                                ? "bg-slate-800 text-white font-medium shadow-sm border border-slate-700"
                                : "text-slate-400 hover:bg-slate-900 hover:text-white"
                        )}
                        title={isCollapsed ? item.label : ""}
                    >
                        <item.icon className={cn(
                            "h-5 w-5 transition-colors",
                            pathname === item.href ? "text-white" : "text-slate-400 group-hover:text-white",
                        )} />
                        {!isCollapsed && <span>{item.label}</span>}
                    </Link>
                ))}
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-slate-800">
                {!isCollapsed && (
                    isPro ? (
                        <div className="mb-4 p-4 rounded-xl border border-slate-800 bg-slate-900 shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <Crown className="h-4 w-4 text-white" />
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Pro Plan</p>
                            </div>
                            <h4 className="font-bold text-white text-lg mb-1">Unlimited Access</h4>
                            <p className="text-xs text-slate-400 mb-4">Generate as many posts as you want!</p>
                            <Link href="/app/billing">
                                <Button variant="outline" size="sm" className="w-full h-9 border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white font-medium text-xs">
                                    Manage Subscription
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="mb-4 p-4 rounded-xl border border-slate-800 bg-slate-900 shadow-sm">
                            <p className="text-xs font-bold opacity-80 uppercase tracking-wider mb-2 text-slate-400">Current Plan</p>
                            <h4 className="font-bold text-white mb-3">Free Tier</h4>
                            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-2">
                                <div className="h-full bg-white transition-all" style={{ width: `${(currentUsage / 3) * 100}%` }} />
                            </div>
                            <p className="text-[10px] text-slate-400 font-medium">{currentUsage}/3 free posts used</p>
                            <Link href="/app/billing">
                                <Button className="w-full mt-4 bg-white text-slate-950 hover:bg-slate-200 h-9 text-xs font-medium">
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
                                <p className="text-sm font-bold text-white truncate">My Account</p>
                                <p className="text-xs text-slate-400 truncate">User Profile</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
