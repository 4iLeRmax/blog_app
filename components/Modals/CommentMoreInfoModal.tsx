'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MdDeleteOutline, MdOutlineReportProblem, MdReportProblem } from 'react-icons/md';
import { deleteComment, reportComment } from '@/lib/actions';
import { LuReply } from 'react-icons/lu';
import ConfirmationModal from './ConfirmationModal';
import { Comm, ReportComment } from '@/types';

type CommentMoreInfoModalProps = {
  isAdmin: boolean;
  postId: string;
  comment: Comm;
  isUserOwnComment: boolean;
  reportedCommentsFromCurrentSessionUser: ReportComment[];
};

const CommentMoreInfoModal = ({
  isAdmin,
  postId,
  comment,
  isUserOwnComment,
  reportedCommentsFromCurrentSessionUser,
}: CommentMoreInfoModalProps) => {
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const commentIsReported = reportedCommentsFromCurrentSessionUser.some(
    (el) => el.commentId === comment.id,
  );

  // console.log(reportedCommentsFromCurrentSessionUser);
  // console.log(commentIsReported);
  

  const setNewFormAction = () => {
    localStorage.setItem(
      'action',
      JSON.stringify({
        createReply: { postId, commentId: comment.id, replyToUser: comment.username },
      }),
    );
  };
  return (
    <>
      <AnimatePresence>
        {confirmationModalOpen ? (
          <ConfirmationModal
            handleClose={() => setConfirmationModalOpen(false)}
            textObj={{
              title: 'Delete',
              subtitle: 'Are you sure you want to delete this comment ?',
              addInfo: 'It will be permanently deleted !',
            }}
          >
            <form
              action={deleteComment.bind(null, { postId, commentId: comment.id })}
              className='w-full'
            >
              <button className='w-full py-1 text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-400'>
                Ok
              </button>
            </form>
          </ConfirmationModal>
        ) : null}
      </AnimatePresence>
      <motion.div
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 40, opacity: 0 }}
        // transition={{duration: 300}}
        className='absolute top-0 -z-10 right-10'
      >
        <div className='flex flex-col w-32 bg-white rounded-md shadow-xl '>
          <button
            onClick={setNewFormAction}
            className='flex items-center w-full gap-1 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-200'
          >
            <LuReply />
            Reply
          </button>
          {!isUserOwnComment ? (
            !commentIsReported ? (
              <form
                action={reportComment.bind(null, { postId, commentId: comment.id })}
                className='w-full'
              >
                <button className='flex items-center w-full gap-1 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-200'>
                  <MdOutlineReportProblem />
                  Report
                </button>
              </form>
            ) : (
              <div className='flex items-center w-full gap-1 px-2 py-1 bg-gray-200 rounded-md cursor-default'>
                <MdReportProblem />
                Reported
              </div>
            )
          ) : null}
          {isAdmin || isUserOwnComment ? (
            <button
              onClick={() => setConfirmationModalOpen(true)}
              className='flex items-center w-full gap-1 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-200'
            >
              <MdDeleteOutline />
              Delete
            </button>
          ) : null}
        </div>
      </motion.div>
    </>
  );
};

export default CommentMoreInfoModal;
