import Image from 'next/image';
import React from 'react';

type UserCommentProps = {
  comment: Comm;
};

export default function UserComment({ comment }: UserCommentProps) {
  return (
    <>
      <div className='p-2 bg-white rounded-xl'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            {comment.userImage ? (
              <div className='relative w-8 h-8 overflow-hidden rounded-xl'>
                <Image src={comment.userImage} alt='' fill className='object-cover' />
              </div>
            ) : (
              <div className='flex items-center justify-center w-8 h-8 text-white bg-gray-800 rounded-xl'>
                ?
              </div>
            )}
            <div>{comment.username}</div>
          </div>

          <div>{comment.date}</div>
        </div>
        <div>{comment.comment}</div>
      </div>
    </>
  );
}
