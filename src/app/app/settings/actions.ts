"use server"

import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export type ActionState = {
    success: boolean
    message?: string
    error?: string
}

export async function updateProfile(prevState: any, formData: FormData): Promise<ActionState> {
    try {
        const { userId } = await auth()
        if (!userId) return { success: false, error: "Unauthorized" }

        const niche = formData.get("niche") as string
        const bio = formData.get("bio") as string

        const user = await db.user.findUnique({
            where: { clerkId: userId }
        })

        if (!user) return { success: false, error: "User not found" }

        await db.userProfile.upsert({
            where: { userId: user.id },
            update: {
                niche,
                bio
            },
            create: {
                userId: user.id,
                niche,
                bio
            }
        })

        revalidatePath("/app/settings")
        return { success: true, message: "Profile updated successfully" }
    } catch (error) {
        return { success: false, error: "Failed to update profile" }
    }
}
