import {z} from 'zod'

export const registerSchema = z.object(
    {
        phone: z.string(),
        country: z.string(),
        code: z.string().length(4)
    }
)
