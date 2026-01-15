import { auth, currentUser } from "@clerk/nextjs/server"
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

        if (!user) {
            return new NextResponse("User not found", { status: 404 })
        }

        // If user already has a subscription, redirect to portal
        if (user.stripeCustomerId && user.stripeSubId) {
            const portalSession = await stripe.billingPortal.sessions.create({
                customer: user.stripeCustomerId,
                return_url: `${process.env.NEXT_PUBLIC_APP_URL}/app`,
            })
            return NextResponse.json({ url: portalSession.url })
        }

        // Create new checkout session
        const clerkUser = await currentUser()
        const checkoutSession = await stripe.checkout.sessions.create({
            customer_email: user.email,
            line_items: [
                {
                    price: process.env.STRIPE_PRO_MONTHLY_PRICE_ID,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/app?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/app?canceled=true`,
            metadata: {
                userId: user.id,
                clerkId: userId,
            },
        })

        return NextResponse.json({ url: checkoutSession.url })

    } catch (error: any) {
        console.error("[STRIPE_CHECKOUT_ERROR]", error)
        return new NextResponse(error.message || "Internal Error", { status: 500 })
    }
}
