import { Sidebar } from "@/components/layout/sidebar"

export default function AppLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen overflow-hidden bg-slate-50 font-sans">
            <Sidebar />

            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Mobile Header (Hidden on Laptop) */}
                <header className="md:hidden flex items-center justify-between p-4 border-b bg-white">
                    <h2 className="font-bold text-slate-900 leading-tight">PostGen AI</h2>
                    {/* Mobile nav toggle will go here */}
                </header>

                <main className="flex-1 overflow-y-auto overflow-x-hidden relative h-full">
                    <div className="max-w-7xl mx-auto p-4 md:p-8 min-h-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
