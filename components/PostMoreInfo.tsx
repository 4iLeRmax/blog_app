'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { IoMdMore } from 'react-icons/io';
import PostMoreInfoModal from './Modals/PostMoreInfoModal';

type PostMoreInfoProps = {
  isAdmin: boolean;
  postId: string;
};

export default function PostMoreInfo({ isAdmin, postId }: PostMoreInfoProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='absolute z-10 top-5 right-5'>
      <button
        className='p-2 transition-all bg-white rounded-md shadow-xl cursor-pointer hover:bg-gray-200'
        onClick={() => setIsOpen((p) => !p)}
        onBlur={() => setIsOpen(false)}
      >
        <IoMdMore />
      </button>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            // transition={{duration: 300}}
            className='absolute top-0 -z-10 right-10'
          >
            <PostMoreInfoModal isAdmin={isAdmin} postId={postId} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
