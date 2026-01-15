import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { stripe } from "@/lib/stripe"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { userId } = await auth()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const user = await db.user.findUnique({
            where: { clerkId: userId }
        })

        if (!user || !user.stripeCustomerId) {
            return new NextResponse("No subscription found", { status: 404 })
        }

        // Create portal session
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: user.stripeCustomerId,
            return_url: `${process.env.NEXT_PUBLIC_APP_URL}/app`,
        })

        return NextResponse.json({ url: portalSession.url })

    } catch (error: any) {
        console.error("[STRIPE_PORTAL_ERROR]", error)
        return new NextResponse(error.message || "Internal Error", { status: 500 })
    }
}
