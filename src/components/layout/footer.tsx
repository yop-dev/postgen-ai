export function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white">
            <div className="container mx-auto px-6 py-12 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
                    <div className="col-span-1 md:col-span-1 space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded bg-blue-600 flex items-center justify-center">
                                <span className="text-white font-bold text-sm">P</span>
                            </div>
                            <span className="font-bold text-slate-900 tracking-tight">PostGen AI</span>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Empowering creators to master LinkedIn <br className="hidden lg:block" />
                            with AI-powered content and <br className="hidden lg:block" />
                            realistic post previews.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-4">Product</h4>
                        <ul className="space-y-3 text-sm text-slate-600">
                            <li><a href="#features" className="hover:text-blue-600 transition-colors">Features</a></li>
                            <li><a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a></li>
                            <li><a href="/app" className="hover:text-blue-600 transition-colors">App Dashboard</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-4">Company</h4>
                        <ul className="space-y-3 text-sm text-slate-600">
                            <li><a href="#" className="hover:text-blue-600 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-4">Support</h4>
                        <ul className="space-y-3 text-sm text-slate-600">
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Contact Support</a></li>
                            <li><a href="https://twitter.com" className="hover:text-blue-600 transition-colors">Follow on X</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
                    <p>© 2026 PostGen AI. Built for high-impact content creators.</p>
                    <div className="flex gap-6">
                        <span>English (US)</span>
                        <span>Server Status: Online</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
