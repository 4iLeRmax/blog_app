import Image from 'next/image';
import React from 'react';
import MoreInfo from './MoreInfo';
import PostMoreInfoModal from './Modals/PostMoreInfoModal';
import { formatTimeAgo } from '@/lib/formatTimeAgo';
import { getCurrentDate } from '@/lib/getCurrentDate';

type PostProps = {
  postId: string;
  post: Post;
  isAdmin: boolean;
};

export default function Post({ postId, post, isAdmin }: PostProps) {
  return (
    <>
      <div className='relative w-full p-3 glassEffect'>
        <div className='absolute z-10 top-5 right-5'>
          <MoreInfo>
            <PostMoreInfoModal isAdmin={isAdmin} postId={postId} />
          </MoreInfo>
        </div>
        {post.image ? (
          <div className='relative w-full overflow-hidden rounded-xl'>
            <Image src={post.image} alt='' width={3000} height={1000} className='object-cover' />
          </div>
        ) : null}
        <div>
          <h1 className='pt-1 pb-2 text-3xl' dangerouslySetInnerHTML={{ __html: post.title }} />
          <p dangerouslySetInnerHTML={{ __html: post.body }} />
          <h1 title={getCurrentDate(post.date)} className='flex justify-end pt-5'>{formatTimeAgo(post.date)}</h1>
        </div>
      </div>
    </>
  );
}
