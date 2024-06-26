import React from 'react';
import PostItem from './PostItem';
import { getPosts } from '@/lib/getPosts';

export default async function PostsList() {
  const posts = await getPosts();

  return (
    <>
      {posts && posts.length > 0 ? (
        <div>
          <h1 className='text-2xl font-semibold text-primary-color '>All posts ({posts.length})</h1>
          <div className='grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4'>
            {posts.map((post) => (
              <div key={post.id} className='border-0 glassEffect rounded-xl'>
                <PostItem post={post} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className='flex items-center justify-center mt-20 text-primary-color'>No Posts</div>
      )}
    </>
  );
}
