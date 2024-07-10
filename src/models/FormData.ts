import * as z from 'zod';

export const schema = z.object({
    firstName: z.string().min(1, 'First Name is required'),
    lastName: z.string().min(1, 'Last Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().regex(/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/, 'Invalid phone number, the number must have 10 digits.'),
    quoteNumber: z.string().regex(/^\d{6}$/, 'Quote Number must be 6 digits long and contain only numbers'),
    status: z.string().min(1, 'Status Type is required'),
    request: z.string().min(1, 'Request details is required'),
});
export type FormData = z.infer<typeof schema>;
