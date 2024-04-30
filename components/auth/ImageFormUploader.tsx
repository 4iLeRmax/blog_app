'use client';

import { UploadButton } from '@/lib/uploadthing';
import Image from 'next/image';
import React from 'react';
import { CiImageOn } from 'react-icons/ci';
import { IoClose } from 'react-icons/io5';

type ImageFormUploaderProps = {
  file: string;
  setFile: React.Dispatch<React.SetStateAction<string>>;
  imageError: boolean;
};

export default function ImageFormUploader({ file, setFile, imageError }: ImageFormUploaderProps) {
  return (
    <>
      <div className='flex items-start gap-2 sm:gap-5'>
        {file ? (
          <div className='relative w-24 h-24 overflow-hidden bg-gray-200 rounded-md shadow-md xs:w-36 xs:h-36'>
            <button
              onClick={() => setFile('')}
              className='absolute top-0 right-0 z-10 text-gray-800 rounded-md glassEffect'
            >
              <IoClose size={20} />
            </button>
            <Image src={file} alt='' fill className='object-cover' />
          </div>
        ) : (
          <div className='flex items-center justify-center w-24 h-24 text-xl text-white bg-gray-200 rounded-md shadow-md xs:w-36 xs:h-36'>
            ?
          </div>
        )}
        <div className='w-[calc(100%_-_96px_-_8px)] xs:w-[calc(100%_-_144px_-_8px)] sm:w-[calc(100%_-_144px_-_20px)]'>
          <UploadButton
            endpoint='imageUploader'
            className=' customUploadThingButton'
            onClientUploadComplete={(res) => {
              setFile(res[0].url);
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
          {imageError ? <div className='text-red-500'>Image is required</div> : null}
        </div>
      </div>
    </>
  );
}
