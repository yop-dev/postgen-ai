import Image from "next/image"

export function Footer() {
    return (
        <footer className="border-t border-slate-800 bg-slate-950">
            <div className="container mx-auto px-6 py-12 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
                    <div className="col-span-1 md:col-span-1 space-y-4">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/post-gen-logov2.jpg"
                                alt="InFrame Logo"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <span className="font-bold text-white tracking-tight">InFrame</span>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Empowering creators to master LinkedIn <br className="hidden lg:block" />
                            with AI-powered content and <br className="hidden lg:block" />
                            realistic post previews.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4">Product</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                            <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                            <li><a href="/app" className="hover:text-white transition-colors">App Dashboard</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4">Company</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4">Support</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
                            <li><a href="https://twitter.com" className="hover:text-white transition-colors">Follow on X</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>© 2026 InFrame. Built for high-impact content creators.</p>
                    <div className="flex gap-6">
                        <span>English (US)</span>
                        <span>Server Status: Online</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
