export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-6">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                        <span className="text-white font-bold text-xl">P</span>
                    </div>
                    <span className="text-xl font-bold text-slate-900 tracking-tight">PostGen AI</span>
                </div>

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
            </div>
        </header>
    )
}
