'use client';

import React, { useEffect, useRef, useState, useTransition } from 'react';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

import PostForm from './PostForm';
import ImageUploader from './ImageUploader';
import StatusModal from './Modals/StatusModal';

import { createPost } from '@/lib/actions';

import { TPost, Status } from '@/types';

type CreatePostProps = {
  posts: TPost[] | undefined;
};

export default function CreatePost({ posts }: CreatePostProps) {
  const [file, setFile] = useState('');
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<Status>('');
  const [statusText, setStatusText] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const modalDuration: number = 3000;

  useEffect(() => {
    if (isPending) {
      if (file === '') {
        setStatus('warning');
        setStatusText('The post was created without an image');
      } else {
        setStatus('success');
        setStatusText('The post was successfully created');
      }
    }
  }, [isPending]);

  useEffect(() => {
    const time = setTimeout(() => {
      setStatus('');
      setStatusText('');
    }, modalDuration + 500);
    return () => clearTimeout(time);
  }, [status]);

  const onSubmit = async (formData: FormData) => {
    const form = Object.fromEntries(formData.entries());

    if (form.title !== '' && form.body !== '') {
      const postWithThisTitleExist = posts?.some((post) => post.title === form.title);
      if (!postWithThisTitleExist) {
        startTransition(() => {
          createPost(file, formData);
          if (formRef.current) formRef.current.reset();
        });
      } else {
        setStatus('error');
        setStatusText('The post with this title already exist');
      }
    } else {
      setStatus('error');
      setStatusText('One ore more inputs are empty');
    }
  };

  return (
    <>
      {posts ? (
        <>
          <AnimatePresence>
            {status !== '' ? (
              <StatusModal status={status} modalDuration={modalDuration}>
                {statusText}
              </StatusModal>
            ) : null}
          </AnimatePresence>
          {/* <div className='flex items-start gap-5'> */}
          <div className='flex flex-col-reverse items-start gap-5 p-2 sm:flex-row glassEffect'>
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
      ) : null}
    </>
  );
}
