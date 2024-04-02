import { User } from '@/types';
import prisma from './prisma';

export const createUser = async (user: User) => {
  const res = await prisma.users.create({
    data: {
      ...user,
    },
  });
};
