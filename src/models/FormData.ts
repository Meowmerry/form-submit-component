import * as z from 'zod';

export const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    date: z.date().nullable(),
    services: z.string().min(1, 'Services is required'),
    description: z.string().optional(),
});
export type FormData = z.infer<typeof schema>;
