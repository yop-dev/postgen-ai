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
        <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Account</h2>
            <button
                onClick={handleSignOut}
                className="cursor-pointer rounded-lg border border-red-600 px-6 py-2 text-red-600 font-semibold hover:bg-red-50 transition"
            >
                Sign Out
            </button>
        </div>
    )
}
