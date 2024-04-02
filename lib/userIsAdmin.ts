import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { SessionUser } from '@/types';
import { getServerSession } from 'next-auth';

export const userIsAdmin = async () => {
  const session = await getServerSession(authOptions);
  
  return session?.user ? ((session?.user as SessionUser).role === 'ADMIN' ? true : false) : false;
};
