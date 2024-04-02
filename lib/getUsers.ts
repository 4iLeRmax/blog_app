// export const getUsers = async (): Promise<User[]> => {
//   return await fetch('http://localhost:4200/users').then((res) => res.json());
// };

import { User } from '@/types';
import prisma from './prisma';

export const getUsers = async (): Promise<User[] | null> => {
  return await prisma.users.findMany();
};
