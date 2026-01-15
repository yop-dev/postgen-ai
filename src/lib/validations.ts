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
    minWords: z.number().min(10, "Minimum words must be at least 10").max(1000).optional().default(50),
    maxWords: z.number().min(20, "Maximum words must be at least 20").max(2000).optional().default(300),
    variantCount: z.number().min(1).max(3).optional().default(1),
    personalize: z.boolean().optional().default(false),
})

export type GenerateInput = z.infer<typeof generateSchema>

// Onboarding form validation
export const onboardingSchema = z.object({
    niche: z.string().optional(),
    preferredTone: z.enum(['professional', 'casual', 'bold']).optional(),
    bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
})

export type OnboardingInput = z.infer<typeof onboardingSchema>
