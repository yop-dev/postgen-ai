"use client"

import NextImage from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-6">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className="h-8 w-8 rounded-lg overflow-hidden flex-shrink-0">
                        <NextImage
                            src="/post-gen-logov2.jpg"
                            alt="InFrame Logo"
                            width={32}
                            height={32}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">InFrame</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <a href="#features" className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors">
                        Features
                    </a>
                    <a href="#pricing" className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors">
                        Pricing
                    </a>
                    <a href="/sign-in" className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors border-l pl-8 border-slate-800">
                        Sign In
                    </a>
                    <a
                        href="/sign-up"
                        className="rounded-full bg-white hover:bg-slate-100 text-slate-900 px-5 py-2 text-sm font-semibold transition shadow-lg"
                    >
                        Get Started
                    </a>
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 text-slate-400 cursor-pointer"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Nav Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-slate-800 bg-slate-950 px-6 py-8 space-y-4 shadow-lg animate-in slide-in-from-top-4 duration-200">
                    <a href="#features" className="block text-lg font-medium text-slate-400" onClick={() => setIsMenuOpen(false)}>
                        Features
                    </a>
                    <a href="#pricing" className="block text-lg font-medium text-slate-400" onClick={() => setIsMenuOpen(false)}>
                        Pricing
                    </a>
                    <div className="pt-4 border-t border-slate-800 flex flex-col gap-4">
                        <a href="/sign-in" className="block text-center text-lg font-medium text-slate-400" onClick={() => setIsMenuOpen(false)}>
                            Sign In
                        </a>
                        <a
                            href="/sign-up"
                            className="block text-center rounded-xl bg-white hover:bg-slate-100 text-slate-900 px-5 py-3 text-lg font-semibold shadow-lg"
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
