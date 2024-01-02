'use client';

import React, { useState } from 'react';
import TextEditor from './TextEditor';
import Link from 'next/link';

type UpdatePostFormProps = {
  post: Post;
};

export default function UpdatePostForm({ post }: UpdatePostFormProps) {
  const [titleValue, setTitleValue] = useState('');

  return (
    <>
      <div>
        <form>
          <div className='flex flex-col gap-2'>
            <input
              className='p-2 py-3 text-2xl bg-white rounded-xl'
              type='text'
              value={titleValue}
              defaultValue={post.title}
              onChange={(e) => setTitleValue(e.target.value)}
            />
            {/* <TextEditor /> */}
            <div className='flex items-center justify-between gap-2 my-2 '>
              <Link
                href={`/posts/${post.id}`}
                className='flex items-center justify-center w-1/2 px-5 py-2 text-white bg-blue-500 shadow-md rounded-xl'
              >
                Cancel
              </Link>
              <button className='flex items-center justify-center w-1/2 px-5 py-2 text-white bg-blue-500 shadow-md rounded-xl'>
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
