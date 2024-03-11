'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';
import { IoAddOutline, IoRemoveOutline } from 'react-icons/io5';
import ReplyItem from './ReplyItem';

type CommentRepliesProps = {
  postId: string;
  comment: Comm;
  isAdmin: boolean;
  sessionUsername: string | null | undefined;
  reportedCommentsFromCurrentSessionUser:ReportComment[]
};

export default function CommentReplies({
  comment,
  postId,
  isAdmin,
  sessionUsername,
  reportedCommentsFromCurrentSessionUser
}: CommentRepliesProps) {
  const [showReplies, setShowReplies] = useState(false);
  return (
    <>
      {comment.replies.length > 0 ? (
        <div className='pt-1 pl-8 '>
          <button
            className='flex items-center gap-1 -ml-8'
            onClick={() => setShowReplies((p) => !p)}
          >
            {showReplies ? <IoRemoveOutline size={20} /> : <IoAddOutline size={20} />}
            {showReplies ? 'Hide replies' : 'View replies'} ({comment.replies.length})
          </button>
          {showReplies ? (
            <div className='flex flex-col gap-2 pt-3 mt-2 border-t-2'>
              {comment.replies.map((el) => (
                <ReplyItem
                  key={el.id}
                  postId={postId}
                  commentId={comment.id}
                  reply={el}
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
