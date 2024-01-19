'use client';

import React, { useState } from 'react';
import TextEditor from './TextEditor';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type UpdatePostFormProps = {
  post: Post;
};

export default function UpdatePostForm({ post }: UpdatePostFormProps) {
  const [titleValue, setTitleValue] = useState(post.title);
  const [updatedText, setUpdatedText] = useState(post.body);
  const router = useRouter();

  const updatePost = async () => {
    if (titleValue === '') return -1;
    if (updatedText === '') return -1;

    const res = await fetch(`http://localhost:4200/posts/${post.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: titleValue,
        body: updatedText,
      }),
    });

    if (res.ok) {
      router.push(`/posts/${post.id}`);
    }
  };

  return (
    <>
      <div>
        <div className='flex flex-col gap-5'>
          <input
            className='p-2 py-3 text-2xl bg-white rounded-xl'
            type='text'
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            // onMouseEnter={(e) => e.target.focus()}
          />
          <TextEditor text={post.body} updatedText={updatedText} setUpdatedText={setUpdatedText} />
          <div className='flex items-center justify-between gap-2 my-2 '>
            <Link
              href={`/posts/${post.id}`}
              className='flex items-center justify-center w-1/2 px-5 py-2 text-white bg-blue-500 shadow-md rounded-xl'
            >
              Cancel
            </Link>
            <button
              className='flex items-center justify-center w-1/2 px-5 py-2 text-white bg-blue-500 shadow-md rounded-xl'
              onClick={updatePost}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
