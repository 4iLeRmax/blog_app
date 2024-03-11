'use client';

import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
import UserInfoModal from './Modals/UserInfoModal';

type AvatarProps = {
  user: SessionUser;
};

export default function Avatar({ user }: AvatarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {user ? (
        <div className='relative h-8 select-none'>
          <button
            onClick={() => setIsOpen((p) => !p)}
            className='cursor-pointer '
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
          </button>
          <AnimatePresence>
            {isOpen ? <UserInfoModal user={user} setIsOpen={setIsOpen} /> : null}
          </AnimatePresence>
        </div>
      ) : null}
    </>
  );
}
