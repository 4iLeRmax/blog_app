'use client';

import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import UserInfoModal from './Modals/UserInfoModal';

type AvatarProps = {
  user: SessionUser;
};

export default function Avatar({ user }: AvatarProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {user ? (
        <div className='relative'>
          <div
            onMouseEnter={() => {
              setIsOpen(true);
            }}
            onMouseLeave={() => setIsOpen(false)}
            className='flex items-center gap-1 cursor-pointer'
          >
            {user.image ? (
              <div className='w-8 h-8 overflow-hidden border shadow-md border-gray-100/30 rounded-xl'>
                <Image src={user.image} alt='' width={30} height={30} />
              </div>
            ) : (
              <div className='flex items-center justify-center w-8 h-8 text-white bg-gray-800 border shadow-md border-gray-100/30 rounded-xl'>
                ?
              </div>
            )}
            <h1 className='hidden sm:flex'>{user.name}</h1>
          </div>
          <AnimatePresence>
            {isOpen ? <UserInfoModal email={user.email as string} setIsOpen={setIsOpen} /> : null}
          </AnimatePresence>
        </div>
      ) : null}
    </>
  );
}
