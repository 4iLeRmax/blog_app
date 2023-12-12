import Button from '@/UI/Button';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { createComment } from '@/lib/actions';
import { getServerSession } from 'next-auth';
import React from 'react';
import { IoMdSend } from 'react-icons/io';
import { CiLogin } from 'react-icons/ci';

type CommentFormProps = {
  post: Post;
};

export default async function CommentForm({ post }: CommentFormProps) {
  const session = await getServerSession(authOptions);
  return (
    <>
      {session?.user ? (
        <form className='relative h-32' action={createComment.bind(null, post)}>
          <textarea
            name='comment'
            placeholder='Comment this post ...'
            className='w-full h-full p-2 text-black bg-blue-100 outline-none resize-none rounded-xl'
          />

          <button className='absolute flex items-center justify-center w-8 h-8 text-white bg-blue-500 rounded-full bottom-2 right-2'>
            <IoMdSend />
          </button>
        </form>
      ) : (
        <div className='flex items-center justify-center w-full h-32 bg-blue-100 select-none rounded-xl'>
          Sign in first to leave a comment
        </div>
      )}
    </>
  );
}
