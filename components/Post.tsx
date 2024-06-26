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
import { TPost } from '@/types';

type PostProps = {
  post: TPost;
};

export default async function Post({ post }: PostProps) {
  const isAdmin = await userIsAdmin();

  return (
    <>
      {post ? (
        <div className='relative p-3 glassEffect'>
          <div className='absolute z-10 top-5 right-5'>
            <MoreInfo>
              <PostMoreInfoModal isAdmin={isAdmin} postId={post.id} />
            </MoreInfo>
          </div>
          <PostImage image={post.image} />
          <div>
            <h1 className='pt-1 pb-2 pr-12 overflow-hidden text-3xl text-primary-color text-ellipsis'>
              {post?.title}
            </h1>
            <p
              dangerouslySetInnerHTML={{ __html: post.body }}
              className='break-words text-primary-color'
            />
            <div className='flex justify-between pt-5'>
              <Likes postId={post.id} likes={post.Likes} />
              <h1 title={getCurrentDate(post.date)} className='text-primary-color'>
                {formatTimeAgo(post.date)}
              </h1>
            </div>
          </div>
        </div>
      ) : (
        <div>Post doesn't exist</div>
      )}
    </>
  );
}
