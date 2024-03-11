import { motion } from 'framer-motion';
import Button from '@/UI/Button';
import React from 'react';
import { CiLogout } from 'react-icons/ci';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';

type UserInfoModal = {
  user: SessionUser;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UserInfoModal({ user, setIsOpen }: UserInfoModal) {
  return (
    <>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className='fixed top-[58px] right-0 w-full flex justify-end'
      >
        <div className='relative w-full overflow-hidden bg-white shadow-xl xs:w-64 rounded-xl'>
          <button
            className='absolute p-0.5 bg-white rounded-md top-2 right-2'
            onClick={() => setIsOpen(false)}
          >
            <IoClose size={20} />
          </button>
          <div className='w-full h-16 bg-blue-500'></div>
          <div className='flex items-center justify-center -mt-8'>
            {user.image ? (
              <div className='relative w-16 h-16 overflow-hidden rounded-full'>
                <Image src={user.image} fill alt='' className='object-cover' />
              </div>
            ) : (
              <div className='flex items-center justify-center w-16 h-16 text-xl bg-gray-800 rounded-full'>
                ?
              </div>
            )}
          </div>
          <div className='flex flex-col items-center justify-center mt-2'>
            <div className='text-xl text-bold'>{user.name}</div>
            <div>{user.email}</div>
          </div>
          <div className='flex justify-center py-2 mt-2 transition-colors border-t-2 cursor-pointer hover:bg-gray-200'>
            <Button sign='SignOut'>
              <CiLogout /> Log Out
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
