'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

import ModalsPortal from '@/layouts/ModalsPortal';

import { IoClose } from 'react-icons/io5';
import { RiMenu2Fill } from 'react-icons/ri';
import { IoHomeOutline } from 'react-icons/io5';
import { BsFileEarmarkPost } from 'react-icons/bs';
import { LuLayoutDashboard } from 'react-icons/lu';
import { useRouter } from 'next/navigation';
import ThemeSwitcher from '@/UI/ThemeSwitcher';
import { CiUser } from 'react-icons/ci';
import { SessionUser } from '@/types';

type HeaderLinksProps = {
  sessionUser: SessionUser | undefined;
  isAdmin: boolean;
};

export default function HeaderLinks({ sessionUser, isAdmin }: HeaderLinksProps) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const router = useRouter();

  const handleClick = (link: string) => {
    setMenuIsOpen(false);
    router.push(link);
  };

  return (
    <>
      <div className='items-center hidden gap-3 md:flex text-primary-color'>
        <Link href={'/'}>Home</Link>
        <Link href={'/posts'}>Posts</Link>
        {isAdmin ? <Link href={'/dashboard'}>Dashboard</Link> : null}
      </div>
      <AnimatePresence>
        {menuIsOpen ? (
          <ModalsPortal>
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='fixed top-0 left-0 z-20 w-full h-full bg-black/80'
              ></motion.div>
              <motion.div
                className='fixed top-0 left-0 z-30 flex flex-col h-full gap-3 py-5 rounded-ss-none rounded-es-none items-enter glassEffect backdrop-blur-lg md:hidden'
                initial={{ opacity: 0, x: -300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ type: 'just' }}
              >
                {sessionUser ? (
                  <div className='flex items-center gap-5 pl-5'>
                    <div className='flex items-center gap-2 text-primary-color'>
                      {sessionUser.image ? (
                        <div className='relative object-cover w-10 h-10 overflow-hidden rounded-md bg-[var(--skeletonFirstColor)]'>
                          <Image src={sessionUser.image} fill alt='' />
                        </div>
                      ) : null}
                      <div className='flex flex-col'>
                        <div className='text-xl font-semibold'>{sessionUser.name}</div>
                        <div className='text-sm'>{sessionUser.email}</div>
                      </div>
                    </div>
                    <button
                      className='flex items-center justify-center w-8 h-8'
                      onClick={() => setMenuIsOpen(false)}
                    >
                      <IoClose size={25} />
                    </button>
                  </div>
                ) : (
                  <div className='flex justify-end'>
                    <button
                      className='flex items-center justify-center w-8 h-8'
                      onClick={() => setMenuIsOpen(false)}
                    >
                      <IoClose size={25} />
                    </button>
                  </div>
                )}

                <div className='flex flex-col gap-3 px-5 pt-8'>
                  <button
                    onClick={() => handleClick('/')}
                    className='flex items-center gap-1 text-primary-color'
                  >
                    <IoHomeOutline /> Home
                  </button>
                  <button
                    onClick={() => handleClick('/posts')}
                    className='flex items-center gap-1 text-primary-color'
                  >
                    <BsFileEarmarkPost /> Posts
                  </button>

                  {isAdmin ? (
                    <button
                      onClick={() => handleClick('/dashboard')}
                      className='flex items-center gap-1 text-primary-color'
                    >
                      <LuLayoutDashboard /> Dashboard
                    </button>
                  ) : null}
                </div>
                <div className='absolute right-0 flex justify-end px-5 bottom-5 sm:hidden'>
                  <ThemeSwitcher />
                </div>
              </motion.div>
            </>
          </ModalsPortal>
        ) : null}
      </AnimatePresence>
      <button
        className='flex items-center justify-center w-8 h-8 md:hidden'
        onClick={() => setMenuIsOpen(true)}
      >
        <RiMenu2Fill size={25} />
      </button>
    </>
  );
}
