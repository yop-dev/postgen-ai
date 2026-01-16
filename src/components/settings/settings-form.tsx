"use client"

import { updateProfile, type ActionState } from "@/app/app/settings/actions"
import { useFormStatus } from "react-dom"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"


const initialState: ActionState = {
    message: "",
    error: "",
    success: false
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button
            type="submit"
            disabled={pending}
            className="rounded-lg bg-white px-6 py-2 text-slate-900 font-semibold hover:bg-slate-200 transition shadow-none disabled:opacity-50"
        >
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                </>
            ) : "Save Changes"}
        </Button>
    )
}

interface SettingsFormProps {
    email: string
    profile: {
        niche?: string | null
        bio?: string | null
    } | null
}

export function SettingsForm({ email, profile }: SettingsFormProps) {
    const [state, formAction] = useActionState(updateProfile, initialState)

    useEffect(() => {
        if (state?.success) {
            toast.success(state.message)
        } else if (state?.error) {
            toast.error(state.error)
        }
    }, [state])

    return (
        <form action={formAction} className="space-y-6">
            {/* Profile Settings */}
            <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Profile</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full rounded-md border border-slate-700 p-3 bg-slate-950 text-slate-500 cursor-not-allowed"
                            value={email}
                            disabled
                        />
                        <p className="text-sm text-slate-500 mt-1">Managed by Clerk</p>
                    </div>
                </div>
            </div>

            {/* Preferences */}
            <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Preferences</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Niche
                        </label>
                        <input
                            name="niche"
                            type="text"
                            defaultValue={profile?.niche || ""}
                            className="w-full rounded-md border border-slate-700 bg-slate-950 p-3 text-white focus:ring-slate-700 focus:border-slate-700 placeholder:text-slate-500"
                            placeholder="E.g., Tech, Marketing, Finance"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Bio
                        </label>
                        <textarea
                            name="bio"
                            defaultValue={profile?.bio || ""}
                            className="w-full rounded-md border border-slate-700 bg-slate-950 p-3 min-h-[100px] text-white focus:ring-slate-700 focus:border-slate-700 placeholder:text-slate-500"
                            placeholder="Tell us about yourself..."
                        />
                    </div>

                    <SubmitButton />
                </div>
            </div>
        </form>
    )
}
