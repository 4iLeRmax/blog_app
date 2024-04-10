'use client';

import ButtonWithLoader from '@/UI/ButtonWithLoader';
import { createComment, createReply } from '@/lib/actions';
import { TPost } from '@/types';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';

type CommentFormProps = {
  post: TPost;
};

export default function CommentForm({ post }: CommentFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [isReply, setIsReply] = useState(false);
  const [replyToUser, setReplyToUser] = useState('');
  const CHAR_LIMIT = 200;

  const checkIfReply = () => {
    const actionData = localStorage.getItem('action');

    if (actionData) {
      setIsReply(true);
      const data = JSON.parse(actionData);
      setReplyToUser(data.createReply.replyToUser);
    }
  };

  const onSubmit = async (formData: FormData) => {
    if (inputValue !== '') {
      const actionData = localStorage.getItem('action');
      // createComment(post, formData);

      if (actionData) {
        const data = JSON.parse(actionData);
        createReply(data.createReply, formData);
        localStorage.removeItem('action');
        setIsReply(false);
        setReplyToUser('');
      } else if (!actionData) {
        createComment(post.id, formData);
      }
      if (formRef.current) formRef.current.reset();
      setInputValue('');
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.target.value.length <= CHAR_LIMIT) {
      setInputValue(e.target.value);
    }
  };

  const cancelReply = () => {
    localStorage.removeItem('action');
    setIsReply(false);
    setReplyToUser('');
  };

  return (
    <div className='relative'>
      <AnimatePresence>
        {isReply ? (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className='flex justify-start'
          >
            <div
              className={clsx(
                'flex items-center w-auto gap-1 p-1 bg-blue-100 rounded-ss-xl rounded-se-xl',
                {
                  'rounded-es-xl rounded-ee-xl': !isReply,
                },
              )}
            >
              <div>Reply to @{replyToUser}</div>
              <button onClick={cancelReply}>
                <IoClose />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <form
        className='flex flex-col overflow-hidden'
        ref={formRef}
        action={onSubmit}
        onFocus={checkIfReply}
      >
        <textarea
          name='comment'
          placeholder='Add a comment...'
          className={clsx(
            'w-full h-32 p-2 text-black bg-blue-100 outline-none resize-none rounded-se-xl',
            {
              'rounded-ss-xl': !isReply,
            },
          )}
          value={inputValue}
          onChange={handleChange}
        />

        <div className='flex items-end justify-end gap-2 p-2 bg-blue-100 rounded-es-xl rounded-ee-xl'>
          <div className='text-sm'>
            {inputValue.length}/{CHAR_LIMIT}
          </div>
          <ButtonWithLoader buttonClassName='flex items-center justify-center w-10 h-10 text-white bg-blue-500 rounded-full md:w-8 md:h-8'>
            <IoMdSend />
          </ButtonWithLoader>
        </div>
      </form>
    </div>
  );
}
