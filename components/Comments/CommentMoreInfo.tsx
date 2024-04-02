'use client';

import React, { useEffect } from 'react';
import MoreInfo from '../MoreInfo';
import CommentMoreInfoModal from '../Modals/CommentMoreInfoModal';
import { Comm, ReportComment } from '@/types';

type CommentMoreInfoProps = {
  sessionUser: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
  isAdmin: boolean;
  postId: string;
  comment: Comm;
  reportedCommentsFromCurrentSessionUser: ReportComment[];
};

export default function CommentMoreInfo({
  sessionUser,
  isAdmin,
  postId,
  comment,
  reportedCommentsFromCurrentSessionUser,
}: CommentMoreInfoProps) {
  const isUserOwnComment = sessionUser ? comment.username === sessionUser.name : false;

  useEffect(() => {
    localStorage.removeItem('action');
  }, []);

  return (
    <>
      {sessionUser ? (
        <div className='absolute z-10 top-2 right-2'>
          <MoreInfo>
            <CommentMoreInfoModal
              isAdmin={isAdmin}
              postId={postId}
              comment={comment}
              isUserOwnComment={isUserOwnComment}
              reportedCommentsFromCurrentSessionUser={reportedCommentsFromCurrentSessionUser}
            />
          </MoreInfo>
        </div>
      ) : null}
    </>
  );
}
