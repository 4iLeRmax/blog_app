import React from 'react';
import UserComment from './UserComment';
import CommentForm from './CommentForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { TPost } from '@/types';

type CommentsProps = {
  post: TPost;
};

export default async function Comments({ post }: CommentsProps) {
  const session = await getServerSession(authOptions);

  // console.log(post.comments[0].replies);

  return (
    <>
      <div className='flex flex-col w-full gap-5'>
        {session?.user ? (
          <CommentForm post={post} />
        ) : (
          <div className='flex items-center justify-center w-full h-32 bg-blue-100 select-none rounded-xl'>
            Sign in first to leave a comment
          </div>
        )}
        <div className='flex flex-col w-full gap-2'>
          {post.Comments.length > 0 ? (
            post.Comments.map((comment) => (
              <UserComment key={comment.id} comment={comment} postId={post.id} />
            ))
          ) : (
            <div className='flex items-center justify-center'>No Comments</div>
          )}
        </div>
      </div>
    </>
  );
}
