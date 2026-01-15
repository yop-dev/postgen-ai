import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { notFound, redirect } from "next/navigation"
import { GenerationView } from "@/components/history/generation-view"

export default async function GenerationDetailsPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { userId } = await auth()

    if (!userId) {
        redirect("/sign-in")
    }

    const { id } = await params

    const generation = await db.generation.findUnique({
        where: {
            id,
            user: {
                clerkId: userId
            }
        },
        include: {
            variants: true
        }
    })

    if (!generation) {
        notFound()
    }

    return <GenerationView generation={generation} />
}
