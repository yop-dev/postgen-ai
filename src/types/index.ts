import { Generation, Variant, User, UserProfile, PlanUsage } from '@prisma/client'

// Extended types with relations
export type UserWithRelations = User & {
    profile: UserProfile | null
    usage: PlanUsage | null
}

export type GenerationWithVariants = Generation & {
    variants: Variant[]
}

// API response types
export interface GenerateResponse {
    success: boolean
    generation: GenerationWithVariants
    remainingGenerations: number | 'unlimited'
}

export interface ErrorResponse {
    error: string
    code?: string
}

// Caption generation types
export interface CaptionVariant {
    caption: string
    hashtags: string[]
}
