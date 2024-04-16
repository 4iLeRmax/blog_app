'use client';

import { formatTimeAgo } from '@/lib/formatTimeAgo';
import { TPost } from '@/types';
import clsx from 'clsx';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

type SearchModalProps = {
  filteredPosts: TPost[];
  selectedPost: number;
  params: string;
};

export default function SearchModal({ filteredPosts, selectedPost, params }: SearchModalProps) {
  // const searchParams = useSearchParams();
  // const params = searchParams.get('search') || '';
  // console.log(filteredPosts.length);

  return (
    <>
      {params.length > 0 ? (
        <div className='absolute left-0 z-20 flex flex-col w-full py-3 shadow-md bg-modal-bg top-8 rounded-es-xl rounded-ee-xl text-secondary-color'>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, i) => (
              <Link
                href={`/posts/${post.id}`}
                key={post.id}
                className={clsx(
                  'relative flex items-center justify-between px-5',
                  'before:content-[""] before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:rounded-se-md before:rounded-ee-md py-1 text-primary-color',
                  'hover:bg-hover-modal-bg',
                  {
                    'bg-hover-modal-bg before:bg-blue-500': i === selectedPost,
                  },
                )}
              >
                <h1 className='overflow-hidden text-ellipsis'>{post.title}</h1>
                <div className='hidden xs:flex'>{formatTimeAgo(post.date)}</div>
              </Link>
            ))
          ) : (
            <div className='flex items-center justify-center'>No Results</div>
          )}
        </div>
      ) : null}
    </>
  );
}
