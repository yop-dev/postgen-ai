import { z } from 'zod'

// Generation form validation
export const generateSchema = z.object({
    topic: z
        .string()
        .min(10, 'Topic must be at least 10 characters')
        .max(500, 'Topic must be less than 500 characters'),
    objective: z.enum(['engagement', 'promotion', 'educational'], {
        message: 'Please select an objective',
    }),
    tone: z.enum(['professional', 'casual', 'bold'], {
        message: 'Please select a tone',
    }),
})

export type GenerateInput = z.infer<typeof generateSchema>

// Onboarding form validation
export const onboardingSchema = z.object({
    niche: z.string().optional(),
    preferredTone: z.enum(['professional', 'casual', 'bold']).optional(),
    bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
})

export type OnboardingInput = z.infer<typeof onboardingSchema>
