'use client';

import { createPost } from '@/lib/actions';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useRef, useState, useTransition } from 'react';
import StatusModal from './Modals/StatusModal';
import ImageUploader from './ImageUploader';
import PostForm from './PostForm';

const modalDuration: number = 3000;

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
  }, [isPending]);

  useEffect(() => {
    const time = setTimeout(() => {
      setStatus('');
    }, modalDuration + 500);
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

  const statuses = {
    success: 'The post was successfully created',
    pending: '',
    error: 'One ore more inputs are empty.',
    warning: 'The post was created without an image.',
  };

  return (
    <>
      <AnimatePresence>
        {status !== '' ? (
          <StatusModal status={status} modalDuration={modalDuration}>
            {statuses[status] || ''}
          </StatusModal>
        ) : null}
      </AnimatePresence>
      {/* <div className='flex items-start gap-5'> */}
      <div className='flex flex-col-reverse items-start gap-5 sm:flex-row'>
        <div className='w-full sm:w-[calc(100%_-_144px_-20px)] xl:w-[calc(100%_-_200px_-20px)] 2xl:w-[calc(100%_-_400px_-20px)]'>
          <PostForm
            action={onSubmit}
            submitButtonVariants={{ default: 'Create', pending: 'Creating...' }}
            withCancelButton={false}
          />
        </div>
        <ImageUploader file={file} setFile={setFile} />
      </div>
    </>
  );
}
