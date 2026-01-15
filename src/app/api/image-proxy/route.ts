import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const url = searchParams.get("url")

    if (!url) {
        return new NextResponse("Missing url parameter", { status: 400 })
    }

    try {
        const headers: HeadersInit = {}

        // Add Authorization header and query param if fetching from Pollinations
        let fetchUrl = url

        console.log(`[Proxy] Fetching: ${url.substring(0, 50)}...`)

        if (url.includes("pollinations.ai") && process.env.POLLINATIONS_API_KEY) {
            console.log(`[Proxy] Injecting API Key (Length: ${process.env.POLLINATIONS_API_KEY.length})`)

            // Rewrite to unified API gateway to ensure Auth is respected
            // image.pollinations.ai/prompt/ -> gen.pollinations.ai/image/
            fetchUrl = fetchUrl.replace("image.pollinations.ai/prompt", "gen.pollinations.ai/image")

            // Clean up params (remove nologo, token, key - rely on Header)
            fetchUrl = fetchUrl.replace("&nologo=true", "").replace("?nologo=true", "")
                .replace(/&key=[^&]*/, "").replace(/[?&]key=[^&]*/, "") // Remove existing key param if any

            headers["Authorization"] = `Bearer ${process.env.POLLINATIONS_API_KEY}`
            headers["Cache-Control"] = "no-cache" // Force fresh generation

            console.log(`[Proxy] Final URL: ${fetchUrl}`)
        } else {
            console.log(`[Proxy] No API Key found or not Pollinations URL`)
        }

        const response = await fetch(fetchUrl, { headers })
        console.log(`[Proxy] Response: ${response.status} ${response.statusText}`)
        if (!response.ok) throw new Error("Failed to fetch image")

        const blob = await response.blob()
        const responseHeaders = new Headers()
        responseHeaders.set("Content-Type", blob.type)
        responseHeaders.set("Cache-Control", "public, max-age=3600")

        return new NextResponse(blob, { headers: responseHeaders })
    } catch (error) {
        return new NextResponse("Failed to proxy image", { status: 500 })
    }
}
