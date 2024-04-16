'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Modal from './Modals/Modal';
import { AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

type PostImageProps = {
  image: string | undefined;
};

export default function PostImage({ image }: PostImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handlePress = (e: any) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handlePress);
    return () => window.removeEventListener('keydown', handlePress);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isOpen ? (
          <Modal>
            <div>
              <button
                className='absolute top-0 right-0 z-20 p-1 bg-white rounded-md'
                onClick={() => setIsOpen(false)}
              >
                <IoClose size={30} />
              </button>
              <div className='fixed top-0 left-0 w-full h-full overflow-hidden'>
                {image ? <Image src={image} alt='' fill className='object-contain' /> : null}
              </div>
            </div>
          </Modal>
        ) : null}
      </AnimatePresence>
      {image ? (
        <div
          onClick={() => setIsOpen(true)}
          className='relative w-full overflow-hidden h-[400px] rounded-xl cursor-pointer'
        >
          <Image src={image} alt='' fill className='object-cover' />
        </div>
      ) : null}
    </>
  );
}
