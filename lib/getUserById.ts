// export const getUser = async (id: string): Promise<User> =>
//   await fetch(`http://localhost:4200/users/${id}`).then((res) => res.json());

import { User } from '@/types';
import prisma from './prisma';

export const getUserById = async (id: string): Promise<User | null> => {
  return await prisma.users.findUnique({
    where: {
      id,
    },
  });
};
