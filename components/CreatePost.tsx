'use client';

import Button from '@/UI/Button';
import { createPost } from '@/lib/actions';
import { UploadButton } from '@/lib/uploadthing';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useRef, useState, useTransition } from 'react';
import { useFormStatus } from 'react-dom';
import { IoClose } from 'react-icons/io5';
import StatusModal from './Modals/StatusModal';
import AnimatePresenceWrapper from '@/layouts/AnimatePresenceWrapper';
import ImageUploader from './ImageUploader';

const modalDelay: number = 3000;

export default function CreatePost() {
  const [file, setFile] = useState('');
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<Status>('');
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (isPending) {
      if (file === '') setStatus('warning');
      else setStatus('success');
    }
    // THIS CODE WILL RUN AFTER THE SERVER ACTION
  }, [isPending]);

  useEffect(() => {
    const time = setTimeout(() => {
      setStatus('');
    }, modalDelay + 500);
    return () => clearTimeout(time);
  }, [status]);

  const onSubmit = async (formData: FormData) => {
    const form = Object.fromEntries(formData.entries());

    if (form.title !== '' && form.body !== '') {
      startTransition(() => {
        createPost(file, formData);
        if (formRef.current) formRef.current.reset();
      });
    } else setStatus('error');
  };

  const _status = {
    success: 'Post successfully created',
    pending: '',
    error: 'One ore more inputs is empty',
    warning: 'Post was created without image',
  };

  return (
    <>
      <AnimatePresenceWrapper>
        {status !== '' ? (
          <StatusModal status={status} modalDelay={modalDelay}>
            {_status[status] || ''}
          </StatusModal>
        ) : null}
      </AnimatePresenceWrapper>
      <div className='flex items-start gap-5'>
        <form ref={formRef} action={onSubmit} className='flex flex-col w-full gap-2 '>
          <input
            className='px-5 py-2 text-black glassEffect'
            type='text'
            name='title'
            placeholder='Title'
            // required
          />
          <textarea
            className='px-5 py-2 text-black resize-none h-80 glassEffect'
            name='body'
            placeholder='Post'
            // required
          />
          <button
            type='submit'
            className={clsx(
              'py-2 mt-5 text-white transition-all bg-blue-600 shadow-md rounded-xl hover:bg-blue-500 h-10',
            )}
          >
            {isPending ? 'Creating...' : 'Create'}
            {/* Create */}
          </button>
        </form>
        <ImageUploader file={file} setFile={setFile} />
      </div>
    </>
  );
}
