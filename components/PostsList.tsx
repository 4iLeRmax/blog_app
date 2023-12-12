import React from 'react';
import PostItem from './PostItem';
import { getPosts } from '@/lib/getPosts';

export default async function PostsList() {
  const posts = await getPosts();

  return (
    <>
      <div className='grid grid-cols-3 gap-5'>
        {posts ? (
          posts.length > 0 ? (
            posts.map((post) => <PostItem post={post} key={post.id} />)
          ) : (
            <div>Empty</div>
          )
        ) : null}
      </div>
    </>
  );
}
