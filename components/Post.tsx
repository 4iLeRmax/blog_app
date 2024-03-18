import Image from 'next/image';
import React from 'react';
import MoreInfo from './MoreInfo';
import PostMoreInfoModal from './Modals/PostMoreInfoModal';
import { formatTimeAgo } from '@/lib/formatTimeAgo';
import { getCurrentDate } from '@/lib/getCurrentDate';
import { getPost } from '@/lib/getPost';
import { userIsAdmin } from '@/lib/userIsAdmin';
import Likes from './Likes';
import PostImage from './PostImage';

type PostProps = {
  postId: string;
};

export default async function Post({ postId }: PostProps) {
  const post = await getPost(postId);
  const isAdmin = await userIsAdmin();

  // await new Promise((res) => setTimeout(res, 5000));
  return (
    <>
      <div className='relative w-full p-3 glassEffect'>
        <div className='absolute z-10 top-5 right-5'>
          <MoreInfo>
            <PostMoreInfoModal isAdmin={isAdmin} postId={postId} />
          </MoreInfo>
        </div>
        <PostImage image={post.image} />
        <div>
          <h1 className='pt-1 pb-2 pr-12 text-3xl break-words text-primary-color'>{post.title}</h1>
          <p dangerouslySetInnerHTML={{ __html: post.body }} className='text-primary-color'/>
          <div className='flex justify-between pt-5'>
            <Likes postId={post.id} likes={post.likes} />
            <h1 title={getCurrentDate(post.date)} className='text-primary-color'>{formatTimeAgo(post.date)}</h1>
          </div>
        </div>
      </div>
    </>
  );
}
