'use client';

import React, { useState } from 'react';
import ConfirmationModal from '../Modals/ConfirmationModal';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type LinkCheckerProps = {
  link: string;
};

export default function LinkChecker({ link }: LinkCheckerProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <AnimatePresence>
        {modalIsOpen ? (
          <ConfirmationModal
            handleClose={() => setModalIsOpen(false)}
            textObj={{
              title: 'Link',
              subtitle: 'You are leaving our site',
              addInfo:
                "By leaving our site we are not responsible for any further content you'll see  ",
            }}
          >
            <button
              className='w-full py-1 text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-400'
              onClick={() => router.push(link)}
            >
              Leave us
            </button>
          </ConfirmationModal>
        ) : null}
      </AnimatePresence>
      <button
        className='text-[#facf74] underline text-bold hover:text-[#FDB10B] transition-colors'
        onClick={() => setModalIsOpen(true)}
        title={link}
      >
        {link.slice(0, 26) + '...'}
      </button>
    </>
  );
}
