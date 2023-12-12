'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ConfirmActionModal() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className='absolute top-0 right-0 z-30 flex items-center justify-center w-screen h-screen bg-black/80'
      >
        <motion.div
          initial={{ scale: 0, opacity: 0, y: 200 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 200 }}
          transition={{ delay: 0.3 }}
          className='p-2 bg-white rounded-xl'
        >
          Blasashfasf
        </motion.div>
      </motion.div>
    </>
  );
}
