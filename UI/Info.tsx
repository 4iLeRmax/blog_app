'use client';

import React, { useState } from 'react';
import { MdOutlineInfo } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';

type InfoProps = {
  message: string;
};

export default function Info({ message }: InfoProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className='relative h-5'>
        <button
          type='button'
          className=''
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <MdOutlineInfo size={20} />
        </button>
        <AnimatePresence>
          {isOpen ? (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className='absolute z-20 w-32 p-2 bg-white rounded-md shadow-xl left-8 top-8'
            >
              {message}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
}
