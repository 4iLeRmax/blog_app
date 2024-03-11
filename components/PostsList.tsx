import React from 'react';
import PostItem from './PostItem';
import { getPosts } from '@/lib/getPosts';

export default async function PostsList() {
  const posts = await getPosts();
  return (
    <>
      <h1 className='text-2xl font-semibold '>All posts ({posts.length}) </h1>
      <div className='grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4'>
        {posts ? (
          posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className='border-0 glassEffect rounded-xl'>
                <PostItem post={post} />
              </div>
            ))
          ) : (
            <div>Empty</div>
          )
        ) : null}
      </div>
    </>
  );
}
