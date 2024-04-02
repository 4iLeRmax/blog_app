// export const getPost = async (id: string): Promise<Post> => {
//   return await fetch(`http://localhost:4200/posts/${id}`).then((res) => res.json());
// };

import { TPost } from '@/types';
import prisma from './prisma';

export const getPost = async (id: string): Promise<TPost | undefined | null> => {
  try {
    return await prisma.posts.findFirst({
      where: {
        id,
      },
      include: {
        Likes: true,
        Comments: {
          include: {
            Replies: true,
          },
        },
      },
    });
  } catch {
    console.error(`Post ${id}`);
  }
};
