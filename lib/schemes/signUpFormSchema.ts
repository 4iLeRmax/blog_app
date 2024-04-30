import { z } from 'zod';
import prisma from '../prisma';

export const schema = z
  .object({
    email: z.string().trim().email({ message: 'Email is not valid' }),
    name: z
      .string()
      .min(3, { message: 'Username is too short' })
      .max(20, { message: 'Username is too long' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(32, { message: 'Password must be at most 32 characters long' })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/, {
        message: 'Invalid password',
      }),
    confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password must match',
    path: ['confirmPassword'],
  });
