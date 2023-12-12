import Image from 'next/image';
import React from 'react';
import PostMoreInfo from './PostMoreInfo';

type PostProps = {
  postId: string;
  post: Post;
  isAdmin: boolean;
};

export default function Post({ postId, post, isAdmin }: PostProps) {
  return (
    <>
      <div className='relative w-full p-3 glassEffect'>
        <PostMoreInfo isAdmin={isAdmin} postId={postId} />
        {post.image ? (
          <div className='relative w-full overflow-hidden h-80 rounded-xl'>
            <Image src={post.image} alt='' fill className='object-cover' />
          </div>
        ) : null}
        <div>
          <h1 className='pt-1 pb-2 text-3xl' dangerouslySetInnerHTML={{ __html: post.title }} />
          <p dangerouslySetInnerHTML={{ __html: post.body }} />
          <div className='flex justify-end pt-5'>{post.date}</div>
        </div>
      </div>
    </>
  );
}
