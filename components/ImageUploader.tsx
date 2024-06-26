'use client';

import { UploadButton } from '@/lib/uploadthing';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';

type ImageUploaderProps = {
  file: string;
  setFile: React.Dispatch<React.SetStateAction<string>>;
};

export default function ImageUploader({ file, setFile }: ImageUploaderProps) {
  return (
    <>
      {/* <div className='flex flex-col gap-5 w-[144px]'> */}
      <div className='flex flex-col w-full gap-5 sm:w-[144px] xl:w-[200px] 2xl:w-[400px]'>
        <div className='h-[400px] sm:h-[144px] xl:h-[200px] 2xl:h-[400px]' id='width'>
          <AnimatePresence>
            {file ? (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className='relative w-full h-full overflow-hidden bg-blue-100 rounded-xl'
              >
                <button
                  onClick={() => setFile('')}
                  className='absolute z-10 flex items-center justify-center w-6 h-6 text-black/40 glassEffect top-1 right-1'
                >
                  <IoClose size={20} />
                </button>
                <Image src={file} alt='' fill className='object-cover' />
              </motion.div>
            ) : (
              <div className='flex items-center justify-center w-full h-full border-2 border-blue-100 border-dashed rounded-xl'>
                ?
              </div>
            )}
          </AnimatePresence>
        </div>
        <UploadButton
          endpoint='imageUploader'
          className='customUploadThingButton'
          onClientUploadComplete={(res) => {
            setFile(res[0].url);
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>
    </>
  );
}
