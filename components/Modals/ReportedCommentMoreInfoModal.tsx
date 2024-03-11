'use client';

import { motion } from 'framer-motion';
import React from 'react';
import Link from 'next/link';

import { deleteComment, deleteReply, deleteReportComment } from '@/lib/actions';

import { MdDeleteOutline } from 'react-icons/md';
import { AiTwotoneSafetyCertificate } from 'react-icons/ai';
import { GrOverview } from 'react-icons/gr';

type ReportedCommentMoreInfoModalProps = {
  reportedComment: RepCommUI;
};

export default function ReportedCommentMoreInfoModal({
  reportedComment,
}: ReportedCommentMoreInfoModalProps) {
  const determineAction = (formData: FormData) => {
    if (reportedComment.pathId.replyId === null) {
      return deleteComment(
        {
          postId: reportedComment.pathId.postId,
          commentId: reportedComment.pathId.commentId,
        },
        formData,
      );
    } else if (reportedComment.pathId.replyId !== null) {
      return deleteReply(
        {
          postId: reportedComment.pathId.postId,
          commentId: reportedComment.pathId.commentId,
          replyId: reportedComment.pathId.replyId,
        },
        formData,
      );
    }
  };
  return (
    <>
      <motion.div
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 40, opacity: 0 }}
        className='absolute top-0 -z-10 right-10'
      >
        <div className='flex flex-col bg-white rounded-md shadow-xl w-36'>
          <form action={deleteReportComment.bind(null, reportedComment.id)} className='w-full'>
            <button className='flex items-center w-full gap-1 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-200'>
              <AiTwotoneSafetyCertificate />
              Acquit
            </button>
          </form>
          <form action={determineAction} className='w-full'>
            <button className='flex items-center w-full gap-1 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-200'>
              <MdDeleteOutline />
              Delete
            </button>
          </form>
          <Link
            href={`/posts/${reportedComment.pathId.postId}`}
            className='flex items-center w-full gap-1 px-2 py-1 rounded-md cursor-pointer nowrap hover:bg-gray-200 '
          >
            <GrOverview />
            View the post
          </Link>
        </div>
      </motion.div>
    </>
  );
}
