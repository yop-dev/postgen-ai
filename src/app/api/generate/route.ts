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
        const { topic, objective, tone, minWords, maxWords, variantCount, personalize } = validatedData
        const count = variantCount || 1

        // 1. Check user usage/subscription
        let user = await db.user.findUnique({
            where: { clerkId: userId },
            include: {
                usage: true,
                profile: true  // Include profile for personalization
            }
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
                include: {
                    usage: true,
                    profile: true
                }
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
        // Build personalization context if enabled
        let personalizationContext = ""
        if (personalize && user.profile) {
            const parts = []
            if (user.profile.niche) {
                parts.push(`You are writing for someone in the ${user.profile.niche} space.`)
            }
            if (user.profile.bio) {
                parts.push(`Their professional bio: "${user.profile.bio}"`)
            }
            if (parts.length > 0) {
                personalizationContext = `\n\nPERSONALIZATION CONTEXT:\n${parts.join(' ')}\nAlign the post with their expertise, voice, and brand.\n`
            }
        }

        const prompt = `Generate ${count} high-engaging LinkedIn post variants about the following topic: "${topic}". 
    The objective is ${objective} and the tone should be ${tone}.${personalizationContext}
    IMPORTANT - WORD COUNT STRICTNESS:
    The post MUST be between ${minWords || 50} and ${maxWords || 300} words.
    Do NOT generate short content if a higher count is requested.
    If the requested count is high (e.g. >200 words), expand with detailed examples, actionable steps, lists, and deep insights to meet the length requirement.
    
    For EACH variant, you must ALSO generate a creative, specific text-to-image prompt for a header image that visually represents that specific post variant.
    - Style guide: Modern, clean, minimalist, abstract or isometric illustration. 
    - Avoid: Generic stock photos, people shaking hands, messy text.
    - Focus on: Concepts, metaphors, symbols, or atmospheric scenes relevant to the topic.

    Return the response as a JSON object with a "variants" key containing an array of ${count} objects.
    Each object in the array MUST have:
    - "post": the complete post content string including emojis and hashtags.
    - "imagePrompt": the image description string.`

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
        let rawVariants = Array.isArray(parsedContent.variants) ? parsedContent.variants : []

        // Check if rawVariants is valid, if not try to recover
        if (!rawVariants.length && typeof parsedContent === 'object') {
            // Sometimes it might be directly in keys if model hallucinates structure
            const values = Object.values(parsedContent)
            if (Array.isArray(values[0])) rawVariants = values[0]
        }

        // Normalize variants to ensure they have post and imagePrompt
        const processedVariants = rawVariants.map((v: any) => {
            const postContent = typeof v === 'string' ? v : v.post || v.content || v.text || JSON.stringify(v)
            const imgPrompt = v.imagePrompt || `A professional, high-quality, modern minimalist image for a LinkedIn post about: ${topic}`

            // Generate Image URL for this variant
            const imgUrl = generatePollinationsImage(imgPrompt, {
                width: isPro ? 1024 : 512,
                height: isPro ? 1024 : 512,
                model: 'flux',
                nologo: true,
                seed: Math.floor(Math.random() * 1000000),
                apiKey: process.env.POLLINATIONS_API_KEY,
            })

            return {
                content: postContent,
                imageUrl: imgUrl
            }
        })

        // 4. Save to Database
        // Use the first variant's image as the main one for backward compatibility
        const mainImageUrl = processedVariants.length > 0 ? processedVariants[0].imageUrl : null

        const generation = await db.generation.create({
            data: {
                userId: user.id,
                topic,
                objective: objective as any,
                tone: tone as any,
                modelUsed: AI_MODELS.TEXT,
                // @ts-ignore
                imageUrl: mainImageUrl, // Backward compatibility
                variants: {
                    create: processedVariants.map((v: any) => ({
                        content: v.content,
                        // @ts-ignore
                        imageUrl: v.imageUrl
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
