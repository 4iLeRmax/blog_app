import { getServerSession } from 'next-auth';
import { getPost } from './getPost';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

export const sessionUserAlreadyLikedPost = async (postId: string) => {
  const post = await getPost(postId);
  const session = await getServerSession(authOptions);

  return post.likes.some((like) => {
    if (session?.user) return like.email === session.user.email && like.name === session.user.name;
  });
};
