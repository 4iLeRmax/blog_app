'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { IoMdMore } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';

type PostMoreInfoProps = {
  children: React.ReactNode;
};

export default function MoreInfo({ children }: PostMoreInfoProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className='relative z-20'>
        <button
          className={clsx('p-2 transition-all rounded-md cursor-pointer ', {
            moreInfoButton: isOpen,
            moreInfoButtonActive: !isOpen,
          })}
          onClick={() => setIsOpen((p) => !p)}
          // onBlur={() => setIsOpen(false)}
        >
          {isOpen ? <IoClose /> : <IoMdMore />}
        </button>
        <AnimatePresence>{isOpen ? children : null}</AnimatePresence>
      </div>
    </>
  );
}
