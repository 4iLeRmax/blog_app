'use client';

import { deletePost } from '@/lib/actions';
import React, { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import Modal from './Modal';

type ConfirmationModalProps = {
  handleClose: () => void;
  textObj: {
    title: string;
    subtitle: string;
    addInfo: string;
  };
  children: React.ReactNode;
};

const ConfirmationModal = ({ handleClose, textObj, children }: ConfirmationModalProps) => {
  useEffect(() => {
    const closeOnEscapeKey = (e: any) => (e.key === 'Escape' ? handleClose() : null);
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => document.body.removeEventListener('keydown', closeOnEscapeKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return (): void => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const { title, subtitle, addInfo } = textObj;
  return (
    <>
      <Modal>
        <div className='flex items-center justify-between px-5 py-2 border-b-2'>
          <h1 className='text-2xl font-semibold text-blue-500'>{title}</h1>
          <button onClick={() => handleClose()}>
            <IoClose size={25} />
          </button>
        </div>

        <div className='px-5 py-2'>
          <h1 className='text-lg'>{subtitle}</h1>
          <p className='flex justify-center text-black/60'>{addInfo}</p>
        </div>

        <div className='flex items-center gap-2 px-5 pt-5 pb-2'>
          {children}
          <button
            onClick={() => handleClose()}
            className='w-full py-1 text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-400'
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmationModal;
