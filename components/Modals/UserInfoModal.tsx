import { motion } from 'framer-motion';
import Button from '@/UI/Button';
import React from 'react';
import { CiLogout } from 'react-icons/ci';

type UserInfoModal = {
  email: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UserInfoModal({ email, setIsOpen }: UserInfoModal) {
  return (
    <>
      <motion.div
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        initial={{ y: -50, scale: 0, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: -50, scale: 0, opacity: 0 }}
        className='fixed right-0   pt-[14px]'
      >
        <div className='flex flex-col items-start gap-1 p-3 bg-white border-2 shadow-md border-gray-100/30 rounded-xl text-black/40'>
          <h1 className='text-sm'>{email}</h1>
          <Button sign='SignOut'>
            <CiLogout /> Log Out
          </Button>
        </div>
      </motion.div>
    </>
  );
}
