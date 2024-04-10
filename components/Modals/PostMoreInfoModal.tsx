'use client';

import { deletePost } from '@/lib/actions';
import { Session } from 'next-auth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState, useTransition } from 'react';
import { useFormStatus } from 'react-dom';
import { MdDeleteOutline, MdOutlineEdit, MdOutlineContentCopy } from 'react-icons/md';
import AnimatePresenceWrapper from '@/layouts/AnimatePresenceWrapper';
import { AnimatePresence, motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import ConfirmationModal from './ConfirmationModal';
import StatusModal from './StatusModal';

type PostMoreInfoModalProps = {
  isAdmin: boolean;
  postId: string;
};

export default function PostMoreInfoModal({ isAdmin, postId }: PostMoreInfoModalProps) {
  const pathname = usePathname();
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const modalDuration = 3000;

  useEffect(() => {
    if (copied) {
      const time = setTimeout(() => {
        setCopied(false);
      }, modalDuration + 500);
      return () => clearTimeout(time);
    }
  }, [copied]);

  const copyFullURL = () => {
    navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
    setCopied(true);
  };

  return (
    <>
      <AnimatePresence>
        {confirmationModalOpen ? (
          <ConfirmationModal
            handleClose={() => setConfirmationModalOpen(false)}
            textObj={{
              title: 'Delete',
              subtitle: 'Are you sure you want to delete this post ?',
              addInfo: 'It will be permanently deleted !',
            }}
          >
            <form action={deletePost.bind(null, postId)} className='w-full'>
              <button className='w-full py-1 text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-400'>
                Ok
              </button>
            </form>
          </ConfirmationModal>
        ) : null}
        {copied ? (
          <StatusModal modalDuration={modalDuration} status='success'>
            Link was copied successfully
          </StatusModal>
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
          {isAdmin ? (
            <>
              <Link
                href={`/posts/${postId}/edit`}
                className='flex items-center gap-1 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-200'
              >
                <MdOutlineEdit /> Edit
              </Link>

              <button
                className='flex items-center gap-1 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-200'
                onClick={() => setConfirmationModalOpen(true)}
              >
                <MdDeleteOutline />
                Delete
              </button>
            </>
          ) : null}
          <button
            className='flex items-center gap-1 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-200'
            onClick={copyFullURL}
          >
            <MdOutlineContentCopy />
            Copy URl
          </button>
        </div>
      </motion.div>
    </>
  );
}
