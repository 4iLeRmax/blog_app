import prisma from '@/lib/prisma';
import React from 'react';
import PostItem from './PostItem';
import Link from 'next/link';

type LastPostsProps = {
  count: number;
};

export default async function LastPosts({ count }: LastPostsProps) {
  const lastThreePosts = await prisma.posts.findMany({
    orderBy: {
      date: 'desc',
    },
    take: count,
    include: {
      Comments: {
        include: {
          Replies: true,
        },
      },
      Likes: true,
    },
  });

  return (
    <>
      <h1 className='text-2xl font-semibold text-primary-color '>
        Last {lastThreePosts.length} {lastThreePosts.length > 1 ? 'posts' : 'post'}
      </h1>
      <div className='grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4'>
        {lastThreePosts.map((post) => (
          <div key={post.id} className='border-0 glassEffect rounded-xl'>
            <PostItem post={post} />
          </div>
        ))}
      </div>
      <div className='flex items-center justify-center mt-5'>
        <Link
          href={'/posts'}
          className='flex items-center justify-center w-full py-2 transition-colors bg-blue-500 rounded-md xs:w-64 text-primary-color hover:bg-blue-400'
        >
          See More
        </Link>
      </div>
    </>
  );
}
