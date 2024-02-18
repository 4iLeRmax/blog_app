'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';
import { LuReply } from 'react-icons/lu';
import { MdDeleteOutline } from 'react-icons/md';
import { deleteReply } from '@/lib/actions';

type ReplyMoreInfoModalProps = {
  postId: string;
  commentId: string;
  reply: Reply;
  isAdmin: boolean;
  sessionUsername: string | null | undefined;
};

export default function ReplyMoreInfoModal({
  postId,
  commentId,
  reply,
  isAdmin,
  sessionUsername,
}: ReplyMoreInfoModalProps) {
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const isUserOwnReply = sessionUsername ? reply.username === sessionUsername : false;
  return (
    <>
      <AnimatePresence>
        {confirmationModalOpen ? (
          <ConfirmationModal
            handleClose={() => setConfirmationModalOpen(false)}
            textObj={{
              title: 'Delete',
              subtitle: 'Are you sure you want to delete this reply ?',
              addInfo: 'It will be permanently deleted !',
            }}
          >
            <form
              action={deleteReply.bind(null, { postId, commentId, replyId: reply.id })}
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
        <div className='flex flex-col w-32 bg-white rounded-md shadow-xl'>
          <button className='flex items-center w-full gap-1 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-200'>
            <LuReply />
            Reply
          </button>
          {isAdmin || isUserOwnReply ? (
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
}
