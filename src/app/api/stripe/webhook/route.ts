import { db } from "@/lib/db"
import { stripe } from "@/lib/stripe"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(req: Request) {
    const body = await req.text()
    const signature = (await headers()).get("stripe-signature")

    if (!signature) {
        return new NextResponse("No signature", { status: 400 })
    }

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error: any) {
        console.error("[STRIPE_WEBHOOK_ERROR]", error.message)
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
    }

    const session = event.data.object as Stripe.Checkout.Session
    const subscription = event.data.object as Stripe.Subscription

    try {
        switch (event.type) {
            case "checkout.session.completed":
                // Payment successful, upgrade user to PRO
                if (session.metadata?.userId) {
                    await db.user.update({
                        where: { id: session.metadata.userId },
                        data: {
                            plan: "PRO",
                            stripeCustomerId: session.customer as string,
                            stripeSubId: session.subscription as string,
                        },
                    })
                    console.log(`[STRIPE] User ${session.metadata.userId} upgraded to PRO`)
                }
                break

            case "customer.subscription.updated":
                // Subscription updated (e.g., payment method changed)
                const updatedUser = await db.user.findFirst({
                    where: { stripeSubId: subscription.id },
                })

                if (updatedUser) {
                    const newPlan = subscription.status === "active" ? "PRO" : "FREE"
                    await db.user.update({
                        where: { id: updatedUser.id },
                        data: { plan: newPlan },
                    })
                    console.log(`[STRIPE] User ${updatedUser.id} subscription updated to ${newPlan}`)
                }
                break

            case "customer.subscription.deleted":
                // Subscription canceled, downgrade to FREE
                const canceledUser = await db.user.findFirst({
                    where: { stripeSubId: subscription.id },
                })

                if (canceledUser) {
                    await db.user.update({
                        where: { id: canceledUser.id },
                        data: {
                            plan: "FREE",
                            stripeSubId: null,
                        },
                    })
                    console.log(`[STRIPE] User ${canceledUser.id} downgraded to FREE`)
                }
                break

            default:
                console.log(`[STRIPE] Unhandled event type: ${event.type}`)
        }

        return new NextResponse(null, { status: 200 })
    } catch (error: any) {
        console.error("[STRIPE_WEBHOOK_PROCESSING_ERROR]", error)
        return new NextResponse("Webhook processing failed", { status: 500 })
    }
}
