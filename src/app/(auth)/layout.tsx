import { Header } from "@/components/layout/header"

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-slate-950">
            <Header />
            {children}
        </div>
    )
}
