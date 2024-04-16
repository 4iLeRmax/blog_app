import { TPost } from '@/types';
import prisma from './prisma';

// export const getPosts = async (): Promise<Post[]> => {
//   // await new Promise((resolve) => setTimeout(resolve, 3000));

//   const res = await fetch('http://localhost:4200/posts');

//   return res.json();
// };

export const getPosts = async (): Promise<TPost[] | undefined> => {
  try {
    const posts = await prisma.posts.findMany({
      orderBy: {
        date: 'asc',
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

    return posts;
  } catch {
    console.error('Posts');
  }
};
