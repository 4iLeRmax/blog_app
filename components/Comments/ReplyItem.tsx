'use client';

import Image from 'next/image';
import React from 'react';
import MoreInfo from '../MoreInfo';
import ReplyMoreInfoModal from '../Modals/ReplyMoreInfoModal';
import { getCurrentDate } from '@/lib/getCurrentDate';
import { formatTimeAgo } from '@/lib/formatTimeAgo';

type ReplyItemProps = {
  postId: string;
  commentId: string;
  reply: Reply;
  isAdmin: boolean;
  sessionUsername: string | null | undefined;
};

export default function ReplyItem({
  postId,
  commentId,
  reply,
  isAdmin,
  sessionUsername,
}: ReplyItemProps) {
  return (
    <>
      <div className='relative flex items-start w-full gap-2'>
        <div className='absolute top-0 left-0'>
          <div className='relative w-8 h-8 overflow-hidden rounded-md'>
            <Image src={reply.userImage} alt='' fill />
          </div>
        </div>

        <div className='w-full'>
          <div className='w-full '>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-1 pl-10 '>
                <div className='font-bold'>{reply.username}</div>
                to
                <div className='font-bold'>@{reply.replyToUser}</div>
              </div>
              <MoreInfo>
                <ReplyMoreInfoModal
                  postId={postId}
                  commentId={commentId}
                  reply={reply}
                  isAdmin={isAdmin}
                  sessionUsername={sessionUsername}
                />
              </MoreInfo>
            </div>

            <div className='w-full pl-10 break-words'>{reply.reply}</div>
          </div>

          <h1 title={getCurrentDate(reply.date)}>{formatTimeAgo(reply.date)}</h1>
          {/* <button onClick={() => setConfirmationModalOpen(true)}>Delete</button> */}
        </div>
      </div>
    </>
  );
}
