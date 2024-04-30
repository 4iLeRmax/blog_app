import { z } from 'zod';

export const schema = z.object({
  email: z.string().trim().email({ message: 'Email is not valid' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(32, { message: 'Password must be at most 32 characters long' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/, {
      message: 'Invalid password',
    }),
});
