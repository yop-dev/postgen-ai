import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { onboardingSchema } from "@/lib/validations"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const body = await req.json()
        const validatedData = onboardingSchema.parse(body)
        const { niche, preferredTone, bio } = validatedData

        // Update user profile
        let user = await db.user.findUnique({
            where: { clerkId: userId }
        })

        if (!user) {
            // If user doesn't exist (webhook might have failed on localhost), create them
            const { currentUser } = await import("@clerk/nextjs/server")
            const clerkUser = await currentUser()

            if (!clerkUser) {
                return new NextResponse("User not found in Clerk", { status: 404 })
            }

            user = await db.user.create({
                data: {
                    clerkId: userId,
                    email: clerkUser.emailAddresses[0].emailAddress,
                    usage: {
                        create: {
                            lifetimeCount: 0,
                        },
                    },
                }
            })
        }

        await db.userProfile.upsert({
            where: { userId: user.id },
            update: {
                niche,
                preferredTone: preferredTone?.toUpperCase() as any,
                bio,
            },
            create: {
                userId: user.id,
                niche,
                preferredTone: preferredTone?.toUpperCase() as any,
                bio,
            }
        })

        return NextResponse.json({ success: true })

    } catch (error: any) {
        console.error("[ONBOARDING_ERROR]", error)
        return new NextResponse(error.message || "Internal Error", { status: 500 })
    }
}
