// Plan limits
export const FREE_GENERATION_LIMIT = 3

// Pricing
export const PRO_MONTHLY_PRICE = 15

// Image resolutions
export const IMAGE_SIZES = {
    FREE: '512x512' as const,
    PRO: '1024x1024' as const,
}

// AI Models
export const AI_MODELS = {
    TEXT: 'llama-3.3-70b-versatile', // Groq - Fast and cost-effective
    IMAGE: 'pollinations-flux', // Pollinations AI - Free, no API key needed
}

// Objective options
export const OBJECTIVES = [
    { value: 'engagement', label: 'Engagement' },
    { value: 'promotion', label: 'Promotion' },
    { value: 'educational', label: 'Educational' },
] as const

// Tone options
export const TONES = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'bold', label: 'Bold' },
] as const
