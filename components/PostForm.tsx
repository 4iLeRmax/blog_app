'use client';

import React, { useState } from 'react';
import TextEditor from './TextEditor';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SubmitButton from '@/UI/SubmitButton';
import { TPost } from '@/types';

type PostFormProps = {
  post?: TPost;
  action: any;
  submitButtonVariants: {
    default: string;
    pending: string;
  };
  withCancelButton: boolean;
};

export default function PostForm({
  post,
  submitButtonVariants,
  action,
  withCancelButton,
}: PostFormProps) {
  const [titleValue, setTitleValue] = useState(post ? post.title : '');
  const [updatedText, setUpdatedText] = useState(post ? post.body : '');
  const router = useRouter();

  // const updatePost = async () => {
  //   if (titleValue === '') return -1;
  //   if (updatedText === '') return -1;

  //   const res = await fetch(`http://localhost:4200/posts/${post.id}`, {
  //     method: 'PATCH',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       title: titleValue,
  //       body: updatedText,
  //     }),
  //   });

  //   if (res.ok) {
  //     router.push(`/posts/${post.id}`);
  //   }
  // };

  return (
    <>
      <div>
        <form action={action} className='flex flex-col gap-5'>
          <input
            className='p-2 py-3 text-2xl bg-white rounded-xl'
            type='text'
            name='title'
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            placeholder='Enter a title post'
          />
          <TextEditor
            text={post ? post.body : ''}
            updatedText={updatedText}
            setUpdatedText={setUpdatedText}
          />
          <input type='hidden' name='body' value={updatedText} />

          <div className='flex items-center gap-2 my-2 '>
            {withCancelButton ? (
              <button
                type='button'
                onClick={() => router.back()}
                className='flex items-center justify-center w-full px-5 py-2 text-white bg-blue-500 shadow-md rounded-xl'
              >
                Cancel
              </button>
            ) : null}
            {/* <Link
              href={`/posts/${post.id}`}
              className='flex items-center justify-center w-1/2 px-5 py-2 text-white bg-blue-500 shadow-md rounded-xl'
            >
              Cancel
            </Link> */}

            <SubmitButton variants={submitButtonVariants} />
          </div>
        </form>
      </div>
    </>
  );
}
