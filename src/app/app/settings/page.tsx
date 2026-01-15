import { currentUser } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { SettingsForm } from "@/components/settings/settings-form"
import { SignOutButton } from "@/components/settings/sign-out-button"
import { redirect } from "next/navigation"

export default async function SettingsPage() {
    const user = await currentUser()

    if (!user) return redirect("/")

    // Fetch profile
    const dbUser = await db.user.findUnique({
        where: { clerkId: user.id },
        include: { profile: true }
    })

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
                <p className="text-slate-500 mt-2">Manage your account and preferences</p>
            </div>

            <SettingsForm
                email={user.primaryEmailAddress?.emailAddress || ""}
                profile={dbUser?.profile || null}
            />

            <SignOutButton />
        </div>
    )
}
