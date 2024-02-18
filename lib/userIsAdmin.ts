import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

export const userIsAdmin = async () => {
  const session = await getServerSession(authOptions);
  return session?.user ? ((session?.user as SessionUser).role === 'admin' ? true : false) : false;
};
