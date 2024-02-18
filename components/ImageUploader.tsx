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
  const [containerWidth, setContainerWidth] = useState(0);

  // const getContainerWidth = () => {
  //   const container = document.getElementById('width');
  //   if (container) {
  //     return container.scrollWidth;
  //   }
  // };

  // useEffect(() => {
  //   const containerWidth = getContainerWidth();
  //   if (containerWidth) {
  //     window.addEventListener('resize', () => setContainerWidth(containerWidth));
  //     return () => window.removeEventListener('resize', () => setContainerWidth(containerWidth));
  //   }
  // }, []);

  // useEffect(() => {
  //   const containerWidth = getContainerWidth();
  //   if (containerWidth) setContainerWidth(containerWidth);
  // }, []);

  return (
    <>
      {/* <div className='flex flex-col gap-5 w-[144px]'> */}
      <div className='flex flex-col w-full gap-5 sm:w-[144px] xl:w-[200px] 2xl:w-[400px]'>
        <div
          className='h-[400px] sm:h-[144px] xl:h-[200px] 2xl:h-[400px]'
          // style={{ height: containerWidth}}
          id='width'
        >
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
        <div className='w-full'>
          <UploadButton
            endpoint='imageUploader'
            className='w-full customUploadThingButton'
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
