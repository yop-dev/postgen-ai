"use client"

import NextImage from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-6">
                <div className="flex items-center gap-2">
                    <div className="relative h-8 w-8 rounded-lg overflow-hidden">
                        <NextImage
                            src="/post-gen-logov2.jpg"
                            alt="PostGen AI Logo"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <span className="text-xl font-bold text-slate-900 tracking-tight">PostGen AI</span>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <a href="#features" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                        Features
                    </a>
                    <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                        Pricing
                    </a>
                    <a href="/sign-in" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors border-l pl-8 border-slate-200">
                        Sign In
                    </a>
                    <a
                        href="/sign-up"
                        className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition shadow-md shadow-slate-200"
                    >
                        Get Started Free
                    </a>
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 text-slate-600"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Nav Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-slate-100 bg-white px-6 py-8 space-y-4 shadow-lg animate-in slide-in-from-top-4 duration-200">
                    <a href="#features" className="block text-lg font-medium text-slate-600" onClick={() => setIsMenuOpen(false)}>
                        Features
                    </a>
                    <a href="#pricing" className="block text-lg font-medium text-slate-600" onClick={() => setIsMenuOpen(false)}>
                        Pricing
                    </a>
                    <div className="pt-4 border-t border-slate-100 flex flex-col gap-4">
                        <a href="/sign-in" className="block text-center text-lg font-medium text-slate-600" onClick={() => setIsMenuOpen(false)}>
                            Sign In
                        </a>
                        <a
                            href="/sign-up"
                            className="block text-center rounded-xl bg-slate-900 px-5 py-3 text-lg font-semibold text-white shadow-md"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Get Started Free
                        </a>
                    </div>
                </div>
            )}
        </header>
    )
}
