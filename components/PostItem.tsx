import Image from 'next/image';
import Link from 'next/link';
import { IoMdHeart } from 'react-icons/io';
import { MdOutlineInsertComment } from 'react-icons/md';

import { formatTimeAgo } from '@/lib/formatTimeAgo';
import { getCurrentDate } from '@/lib/getCurrentDate';

import { TPost } from '@/types';

type PostItemProps = {
  post: TPost;
};

export default function PostItem({ post }: PostItemProps) {
  return (
    <div>
      {post ? (
        <Link href={`/posts/${post.id}`} className='text-primary-color'>
          {post.image ? (
            <div className='relative w-full overflow-hidden h-96 rounded-xl sm:h-60'>
              <Image src={post.image} alt='' fill className={'object-cover'} />
            </div>
          ) : (
            <div className='flex items-center justify-center overflow-hidden text-3xl bg-modal-bg w-ful h-96 sm:h-60 rounded-xl text-black/40'>
              ?
            </div>
          )}
          <div className='px-3 pt-2 text-2xl'>
            <h1 className='overflow-hidden text-ellipsis'>{post.title}</h1>
          </div>

          <div className='flex items-center justify-between p-3'>
            <div className='flex items-center gap-3'>
              <div className='flex items-center gap-1'>
                <IoMdHeart size={20} />
                <span>{post.Likes.length}</span>
              </div>
              <div className='flex items-center gap-1'>
                <MdOutlineInsertComment size={20} /> <span>{post.Comments?.length}</span>
              </div>
            </div>

            <h1 title={getCurrentDate(post.date)}>{formatTimeAgo(post.date)}</h1>
          </div>
        </Link>
      ) : null}
    </div>
  );
}
