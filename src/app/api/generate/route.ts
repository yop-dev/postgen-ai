import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { groq } from "@/lib/groq"
import { generatePollinationsImage } from "@/lib/pollinations"
import { generateSchema } from "@/lib/validations"
import { AI_MODELS, FREE_GENERATION_LIMIT } from "@/constants"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const body = await req.json()
        const validatedData = generateSchema.parse(body)
        const { topic, objective, tone } = validatedData

        // 1. Check user usage/subscription
        let user = await db.user.findUnique({
            where: { clerkId: userId },
            include: { usage: true }
        })

        if (!user) {
            // Fallback for local dev without webhooks
            const { currentUser } = await import("@clerk/nextjs/server")
            const clerkUser = await currentUser()
            if (!clerkUser) return new NextResponse("User not found in Clerk", { status: 404 })

            user = await db.user.create({
                data: {
                    clerkId: userId,
                    email: clerkUser.emailAddresses[0].emailAddress,
                    usage: {
                        create: {
                            lifetimeCount: 0,
                        },
                    },
                },
                include: { usage: true }
            })
        }


        const isPro = user.plan === "PRO"
        const currentUsage = user.usage?.lifetimeCount || 0

        // Superadmin bypass for testing (unlimited generations)
        const isSuperAdmin = user.id === "cmkeywfi20000qrexcf4lsbfq"

        if (!isPro && !isSuperAdmin && currentUsage >= FREE_GENERATION_LIMIT) {
            return new NextResponse("Free limit reached. Please upgrade to Pro.", { status: 403 })
        }

        // 2. Generate Captions AND Image Prompt using Groq
        const prompt = `Generate 3 high-engaging LinkedIn post variants about the following topic: "${topic}". 
    The objective is ${objective} and the tone should be ${tone}.
    
    ALSO generate a creative, specific text-to-image prompt for a header image that visually represents this topic.
    - Style guide: Modern, clean, minimalist, abstract or isometric illustration. 
    - Avoid: Generic stock photos, people shaking hands, messy text.
    - Focus on: Concepts, metaphors, symbols, or atmospheric scenes relevant to the topic.

    Return the response as a JSON object with:
    - "variants": array of 3 complete post variants including emojis and hashtags.
    - "imagePrompt": string containing the image description.`

        const completion = await groq.chat.completions.create({
            model: AI_MODELS.TEXT,
            messages: [
                { role: "system", content: "You are a professional LinkedIn content creator. Always respond with valid JSON." },
                { role: "user", content: prompt }
            ],
            response_format: { type: "json_object" },
            temperature: 0.8,
        })

        const content = completion.choices[0].message.content
        if (!content) throw new Error("Failed to generate content")

        // Parse the JSON response
        const parsedContent = JSON.parse(content)
        let variants = Array.isArray(parsedContent.variants) ? parsedContent.variants : Object.values(parsedContent)[0] as any[]
        const dynamicImagePrompt = parsedContent.imagePrompt || `A professional, high-quality, modern minimalist image for a LinkedIn post about: ${topic}. Style: Clean, corporate yet creative. No text in the image.`

        // Groq sometimes returns objects with 'post' property instead of plain strings
        variants = variants.map((v: any) => typeof v === 'string' ? v : v.post || v.content || v.text || JSON.stringify(v))

        // 3. Generate Image using Pollinations AI
        const imagePrompt = dynamicImagePrompt
        const imageUrl = generatePollinationsImage(imagePrompt, {
            width: isPro ? 1024 : 512,
            height: isPro ? 1024 : 512,
            model: 'flux',
            nologo: true,
            seed: Math.floor(Math.random() * 1000000), // Random seed for variety
            apiKey: process.env.POLLINATIONS_API_KEY, // Optional: Use if you have an API key
        })

        // 4. Save to Database
        const generation = await db.generation.create({
            data: {
                userId: user.id,
                topic,
                objective: objective as any,
                tone: tone as any,
                modelUsed: AI_MODELS.TEXT,
                // @ts-ignore - imageUrl exists in schema and tsc passes.
                imageUrl: imageUrl || null,
                variants: {
                    create: variants.map((v: string) => ({
                        content: v
                    }))
                }
            }
        })

        // 5. Update Usage
        await db.planUsage.update({
            where: { userId: user.id },
            data: {
                lifetimeCount: { increment: 1 }
            }
        })

        return NextResponse.json({ id: generation.id })

    } catch (error: any) {
        console.error("[GENERATE_ERROR]", error)
        return new NextResponse(error.message || "Internal Error", { status: 500 })
    }
}
