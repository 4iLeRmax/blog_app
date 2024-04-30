'use client';

import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { CiLogin } from 'react-icons/ci';
import Modal from '../Modals/Modal';
import AuthModal from '../Modals/AuthModal';

export default function Auth() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {modalIsOpen ? <AuthModal onClose={() => setModalIsOpen(false)} /> : null}
      </AnimatePresence>
      <button onClick={() => setModalIsOpen(true)} className='flex items-center gap-1'>
        <CiLogin />
        <div className='w-14'>Sign in</div>
      </button>
    </>
  );
}
