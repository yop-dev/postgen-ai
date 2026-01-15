import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const url = searchParams.get("url")

    if (!url) {
        return new NextResponse("Missing url parameter", { status: 400 })
    }

    try {
        const response = await fetch(url)
        if (!response.ok) throw new Error("Failed to fetch image")

        const blob = await response.blob()
        const headers = new Headers()
        headers.set("Content-Type", blob.type)
        headers.set("Cache-Control", "public, max-age=3600")

        return new NextResponse(blob, { headers })
    } catch (error) {
        return new NextResponse("Failed to proxy image", { status: 500 })
    }
}
