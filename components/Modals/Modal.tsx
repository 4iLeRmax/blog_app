import ModalsPortal from '@/layouts/ModalsPortal';
import { motion } from 'framer-motion';
import React from 'react';

type ModalProps = {
  children: React.ReactNode;
};

const Modal = ({ children }: ModalProps) => {
  return (
    <>
      <ModalsPortal>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed top-0 right-0 z-30 flex items-center justify-center w-screen h-screen bg-black/80'
        >
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 200 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 200 }}
            className='bg-white rounded-md shadow-xl sm:rounded-xl'
          >
            {children}
          </motion.div>
        </motion.div>
      </ModalsPortal>
    </>
  );
};

export default Modal;
