'use client';

import React, { useState } from 'react';
import { IoAddOutline, IoRemoveOutline } from 'react-icons/io5';
import ReplyItem from './ReplyItem';
import { Session } from 'next-auth';
import { Comm, ReportComment } from '@/types';

type CommentRepliesProps = {
  postId: string;
  comment: Comm;
  session: Session | null;
  isAdmin: boolean;
  sessionUsername: string | null | undefined;
  reportedCommentsFromCurrentSessionUser: ReportComment[];
};

export default function CommentReplies({
  comment,
  postId,
  session,
  isAdmin,
  sessionUsername,
  reportedCommentsFromCurrentSessionUser,
}: CommentRepliesProps) {
  const [showReplies, setShowReplies] = useState(false);
  return (
    <>
      {comment.Replies.length > 0 ? (
        <div className='pt-1 pl-8 '>
          <button
            className='flex items-center gap-1 -ml-8'
            onClick={() => setShowReplies((p) => !p)}
          >
            {showReplies ? <IoRemoveOutline size={20} /> : <IoAddOutline size={20} />}
            {showReplies ? 'Hide replies' : 'View replies'} ({comment.Replies.length})
          </button>
          {showReplies ? (
            <div className='flex flex-col gap-2 pt-3 mt-2 border-t-2'>
              {comment.Replies.map((el) => (
                <ReplyItem
                  key={el.id}
                  postId={postId}
                  commentId={comment.id}
                  reply={el}
                  session={session}
                  isAdmin={isAdmin}
                  sessionUsername={sessionUsername}
                  reportedCommentsFromCurrentSessionUser={reportedCommentsFromCurrentSessionUser}
                />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
