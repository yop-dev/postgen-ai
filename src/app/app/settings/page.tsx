"use client"

import { useClerk } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
    const { signOut } = useClerk()
    const router = useRouter()

    const handleSignOut = async () => {
        await signOut()
        router.push("/")
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-600 mt-2">Manage your account and preferences</p>
            </div>

            {/* Profile Settings */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full rounded-md border border-gray-300 p-3 bg-gray-50"
                            placeholder="your@email.com"
                            disabled
                        />
                        <p className="text-sm text-gray-500 mt-1">Managed by Clerk</p>
                    </div>
                </div>
            </div>

            {/* Preferences */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Preferences</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Niche
                        </label>
                        <input
                            type="text"
                            className="w-full rounded-md border border-gray-300 p-3"
                            placeholder="E.g., Tech, Marketing, Finance"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Preferred Tone
                        </label>
                        <select className="w-full rounded-md border border-gray-300 p-3">
                            <option>Professional</option>
                            <option>Casual</option>
                            <option>Bold</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bio
                        </label>
                        <textarea
                            className="w-full rounded-md border border-gray-300 p-3 min-h-[100px]"
                            placeholder="Tell us about yourself..."
                        />
                    </div>

                    <button className="rounded-lg bg-blue-600 px-6 py-2 text-white font-semibold hover:bg-blue-700 transition">
                        Save Changes
                    </button>
                </div>
            </div>

            {/* Account Actions */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Account</h2>
                <button
                    onClick={handleSignOut}
                    className="rounded-lg border border-red-600 px-6 py-2 text-red-600 font-semibold hover:bg-red-50 transition"
                >
                    Sign Out
                </button>
            </div>
        </div>
    )
}
