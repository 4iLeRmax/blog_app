'use client';

import React, { useEffect, useState } from 'react';
import Avatar from '../Avatar';
import { Session } from 'next-auth';
import { SessionUser } from '@/types';
import Button from '@/UI/Button';
import { CiLogin } from 'react-icons/ci';
import Modal from './Modal';
import SignInForm from '../auth/SignInForm';
import SignUpForm from '../auth/SignUpForm';
import { IoClose } from 'react-icons/io5';
import clsx from 'clsx';
import { motion } from 'framer-motion';

type AuthModalProps = {
  onClose: () => void;
};

export default function AuthModal({ onClose }: AuthModalProps) {
  const [isSignIn, setIsSignIn] = useState(true);

  useEffect(() => {
    window.addEventListener('keydown', (e) => e.key === 'Escape' && onClose());
    return () => window.removeEventListener('keydown', (e) => e.key === 'Escape' && onClose());
  }, []);

  return (
    <>
      <Modal>
        <div className='relative'>
          <div className='grid grid-cols-2 overflow-hidden bg-gray-300 rounded-ss-xl rounded-se-xl'>
            <div className='relative'>
              {isSignIn ? <ActiveBg /> : null}
              <button
                onClick={() => setIsSignIn(true)}
                className={clsx(
                  'relative w-full rounded-ss-xl transition-colors px-5 py-2 xs:px-10 sm:px-20 sm:py-5',
                  {
                    'hover:text-blue-500 text-gray-500': !isSignIn,
                  },
                )}
              >
                Sign In
              </button>
            </div>
            <div className='relative'>
              {!isSignIn ? <ActiveBg /> : null}
              <button
                onClick={() => setIsSignIn(false)}
                className={clsx(
                  'relative w-full rounded-se-xl transition-colors px-5 py-2 xs:px-10 sm:px-20 sm:py-5',
                  {
                    'hover:text-blue-500 text-gray-500': isSignIn,
                  },
                )}
              >
                Sign Up
              </button>
            </div>
            <button
              className='absolute right-0 p-1 text-white -top-8 xs:-right-8'
              onClick={onClose}
            >
              <IoClose size={25} />
            </button>
          </div>
          <div className='px-5 py-10'>{isSignIn ? <SignInForm /> : <SignUpForm />}</div>
        </div>
      </Modal>
    </>
  );
}

export function ActiveBg() {
  return (
    <motion.div
      layoutId='activeBg'
      className='absolute top-0 left-0 w-full h-full bg-white'
    ></motion.div>
  );
}
