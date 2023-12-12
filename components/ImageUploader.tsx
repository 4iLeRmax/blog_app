'use client';

import { UploadButton } from '@/lib/uploadthing';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import { IoClose } from 'react-icons/io5';

type ImageUploaderProps = {
  file: string;
  setFile: React.Dispatch<React.SetStateAction<string>>;
};

export default function ImageUploader({ file, setFile }: ImageUploaderProps) {
  return (
    <>
      <div className='flex flex-col gap-5'>
        <AnimatePresence>
          {file ? (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className='relative w-[144px] h-[144px] overflow-hidden rounded-xl bg-blue-100'
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
            <div className='w-[144px] h-[144px] rounded-xl border-2 border-blue-100 flex items-center justify-center border-dashed'>
              ?
            </div>
          )}
        </AnimatePresence>
        <div className='w-[144px]'>
          <UploadButton
            endpoint='imageUploader'
            onClientUploadComplete={(res) => {
              // Do something with the response
              setFile(res[0].url);
              console.log(file);
              // alert('Upload Completed');
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>
      </div>
    </>
  );
}
