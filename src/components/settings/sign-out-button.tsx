"use client"

import { useClerk } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

export function SignOutButton() {
    const { signOut } = useClerk()
    const router = useRouter()

    const handleSignOut = async () => {
        await signOut({ redirectUrl: "/" })
    }

    return (
        <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Account</h2>
            <button
                onClick={handleSignOut}
                className="cursor-pointer rounded-lg border border-red-900 bg-red-950/30 px-6 py-2 text-red-500 font-semibold hover:bg-red-950/50 transition"
            >
                Sign Out
            </button>
        </div>
    )
}
