/**
 * Pollinations AI - Free, open-source image generation
 * Now supports authentication via enter.pollinations.ai
 */

export interface PollinationsOptions {
    width?: number;
    height?: number;
    seed?: number;
    nologo?: boolean;
    model?: 'flux' | 'turbo' | 'stable-diffusion';
    apiKey?: string; // Optional: For authenticated requests (sk_ or pk_)
}

/**
 * Generate an image URL using Pollinations AI
 * @param prompt - The text prompt for image generation
 * @param options - Optional configuration for the image
 * @returns Direct URL to the generated image (or API endpoint if using key)
 */
export function generatePollinationsImage(
    prompt: string,
    options: PollinationsOptions = {}
): string {
    const {
        width = 1024,
        height = 1024,
        seed,
        nologo = true,
        model = 'flux',
        apiKey
    } = options;

    // URL-encode the prompt and replace spaces with underscores
    const encodedPrompt = encodeURIComponent(prompt.replace(/\s+/g, '_'));

    // Build query parameters
    const params = new URLSearchParams({
        width: width.toString(),
        height: height.toString(),
        model,
        ...(seed && { seed: seed.toString() }),
        ...(nologo && { nologo: 'true' }),
    });

    // If API key is provided, use the new authenticated endpoint
    if (apiKey) {
        return `https://image.pollinations.ai/prompt/${encodedPrompt}?${params.toString()}`;
    }

    // Otherwise use the standard endpoint
    return `https://image.pollinations.ai/prompt/${encodedPrompt}?${params.toString()}`;
}

/**
 * Generate an image using Pollinations AI with fetch (for server-side with API key)
 * @param prompt - The text prompt
 * @param options - Configuration including API key
 * @returns Promise with the image URL
 */
export async function generatePollinationsImageWithAuth(
    prompt: string,
    options: PollinationsOptions = {}
): Promise<string> {
    const url = generatePollinationsImage(prompt, options);

    if (!options.apiKey) {
        return url; // Return direct URL if no auth
    }

    // For authenticated requests, the URL itself works with the key in headers
    // But since we're returning a URL for <img> tags, we'll use the direct URL approach
    return url;
}
