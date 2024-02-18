'use client';

import { createComment, createReply } from '@/lib/actions';
import React, { useRef, useState } from 'react';
import { IoMdSend } from 'react-icons/io';

type CommentFormProps = {
  post: Post;
};

export default function CommentForm({ post }: CommentFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [inputValue, setInputValue] = useState('');
  const CHAR_LIMIT = 200;

  const onSubmit = async (formData: FormData) => {
    if (inputValue !== '') {
      const actionData = localStorage.getItem('action');
      // createComment(post, formData);

      if (actionData) {
        const data = JSON.parse(actionData);
        createReply(data.createReply, formData);
        localStorage.removeItem('action');
      } else if (!actionData) {
        createComment(post, formData);
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

  return (
    <>
      <form className='flex flex-col' ref={formRef} action={onSubmit}>
        <textarea
          name='comment'
          placeholder='Add a comment...'
          className='w-full h-32 p-2 text-black bg-blue-100 outline-none resize-none rounded-ss-xl rounded-se-xl'
          value={inputValue}
          onChange={handleChange}
        />

        <div className='flex items-end justify-end gap-2 p-2 bg-blue-100 rounded-es-xl rounded-ee-xl'>
          <div className='text-sm'>
            {inputValue.length}/{CHAR_LIMIT}
          </div>
          <button className='flex items-center justify-center w-8 h-8 text-white bg-blue-500 rounded-full '>
            <IoMdSend />
          </button>
        </div>
      </form>
    </>
  );
}
