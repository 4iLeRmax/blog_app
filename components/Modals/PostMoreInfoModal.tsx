'use client';

import { deletePost } from '@/lib/actions';
import { Session } from 'next-auth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useFormStatus } from 'react-dom';
import { MdDeleteOutline, MdOutlineEdit, MdOutlineContentCopy } from 'react-icons/md';

type PostMoreInfoModalProps = {
  isAdmin: boolean;
  postId: string;
};

export default function PostMoreInfoModal({ isAdmin, postId }: PostMoreInfoModalProps) {
  const pathname = usePathname();
  // const { pending } = useFormStatus();
  // console.log(postId);
  // console.log(pending);

  const copyFullURL = () => {
    navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
  };

  return (
    <>
      <div className='flex flex-col w-32 bg-white rounded-md shadow-xl'>
        {isAdmin ? (
          <>
            <Link
              href={`/posts/${postId}/edit`}
              className='flex items-center gap-1 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-200'
            >
              <MdOutlineEdit /> Edit
            </Link>
            <form action={deletePost.bind(null, postId)}>
              <button
                type='submit'
                className='flex items-center w-full gap-1 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-200'
              >
                <MdDeleteOutline />
                Delete
              </button>
            </form>
          </>
        ) : null}
        <button
          className='flex items-center gap-1 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-200'
          onClick={copyFullURL}
        >
          <MdOutlineContentCopy />
          Copy URl
        </button>
      </div>
    </>
  );
}
