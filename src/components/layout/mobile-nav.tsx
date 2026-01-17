"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Sidebar } from "./sidebar"
import NextImage from "next/image"

interface MobileNavProps {
    isPro: boolean
    currentUsage: number
}

export function MobileNav({ isPro, currentUsage }: MobileNavProps) {
    const [open, setOpen] = useState(false)

    return (
        <header className="md:hidden sticky top-0 z-50 flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950">
            <div className="flex items-center gap-2">
                <div className="relative h-8 w-8 rounded-lg overflow-hidden">
                    <NextImage
                        src="/post-gen-logov2.jpg"
                        alt="InFrame Logo"
                        fill
                        className="object-cover"
                    />
                </div>
                <h2 className="font-bold text-white leading-tight">InFrame</h2>
            </div>

            <button
                onClick={() => setOpen(true)}
                className="p-2 hover:bg-slate-900 rounded-lg transition-colors cursor-pointer"
                aria-label="Open menu"
            >
                <Menu className="h-6 w-6 text-slate-400" />
            </button>

            {/* Mobile Drawer */}
            {open && (
                <div className="fixed inset-0 z-50 flex">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
                        onClick={() => setOpen(false)}
                    />

                    {/* Sidebar Container */}
                    <div className="relative w-[280px] bg-slate-950 h-full animate-in slide-in-from-left duration-200 shadow-xl border-r border-slate-800">
                        <div className="absolute top-2 right-2 z-50">
                            <button
                                onClick={() => setOpen(false)}
                                className="p-2 hover:bg-slate-900 rounded-full transition-colors cursor-pointer"
                            >
                                <X className="h-5 w-5 text-slate-400" />
                            </button>
                        </div>

                        <Sidebar
                            isPro={isPro}
                            currentUsage={currentUsage}
                            className="w-full border-none shadow-none pt-12"
                            onNavigate={() => setOpen(false)}
                        />
                    </div>
                </div>
            )}
        </header>
    )
}
