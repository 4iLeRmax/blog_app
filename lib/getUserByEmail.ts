import { User } from '@/types';
import prisma from './prisma';

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return await prisma.users.findUnique({
    where: {
      email,
    },
  });
};
