'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { MdOutlineMail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { IoClose, IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { AiOutlineUser } from 'react-icons/ai';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from '@/lib/schemes/signUpFormSchema';
import ImageFormUploader from './ImageFormUploader';
import prisma from '@/lib/prisma';
import { User } from '@/types';
import { createUser } from '@/lib/actions';
import Info from '@/UI/Info';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

type Inputs = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

// const urlRegex = /(?:https?|ftp):\/\/[^\s/$.?#].[^\s]*|www\.[^\s/$.?#].[^\s]*/gi;
const urlRegex =
  /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

export default function SignUpForm() {
  const [file, setFile] = useState('');
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [confirmPasswordHidden, setConfirmPasswordHidden] = useState(true);
  const [imageError, setImageError] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const { refresh } = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const userEmailExist: User | null = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type: 'email', data: data.email }),
    }).then((res) => res.json());

    const userNameExist: User | null = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type: 'name', data: data.name }),
    }).then((res) => res.json());

    if (userEmailExist) {
      setError('email', { message: 'User with this email already exists.' });
    }

    if (userNameExist) {
      setError('name', { message: 'User with this name already exists.' });
    }

    if (file !== '' && urlRegex.test(file) && !userEmailExist && !userNameExist) {
      const user = {
        image: file,
        email: data.email,
        name: data.name,
        password: data.password,
      };
      await createUser(user);
      if (formRef.current) formRef.current.reset();
      setFile('');
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.ok) refresh();
    }
  };

  useEffect(() => {
    if (file !== '' && urlRegex.test(file)) {
      setImageError(false);
    }
  }, [file]);

  const handleCatchImageError = () => {
    if (file === '') {
      setImageError(true);
    }
  };

  return (
    <>
      {/* <div className='h-[250px] overflow-y-scroll'> */}
      <div className='flex flex-col gap-5 '>
        <ImageFormUploader file={file} setFile={setFile} imageError={imageError} />
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          <div className='relative flex flex-col gap-5'>
            <div className='relative flex items-center gap-2 pb-1 border-b-2 border-blue-500 '>
              <MdOutlineMail size={20} />
              <input
                {...register('email')}
                type='email'
                className='w-[calc(100%_-_28px)] outline-none'
                placeholder='email...'
              />
              {errors.email && (
                <div className='absolute left-0 text-sm text-red-500 top-full'>
                  {errors.email.message}
                </div>
              )}
            </div>
            <div className='relative flex items-center gap-2 pb-1 border-b-2 border-blue-500 '>
              <AiOutlineUser size={20} />
              <input
                {...register('name')}
                type='text'
                className='w-[calc(100%_-_28px)] outline-none'
                placeholder='name...'
              />
              {errors.name && (
                <div className='absolute left-0 text-sm text-red-500 top-full'>
                  {errors.name.message}
                </div>
              )}
            </div>
            <div className='relative flex items-center gap-2 pb-1 border-b-2 border-blue-500 '>
              <RiLockPasswordLine size={20} />
              <input
                {...register('password')}
                type={passwordHidden ? 'password' : 'text'}
                className='w-[calc(100%_-_28px)] outline-none pr-11'
                placeholder='password...'
              />
              <button
                onClick={() => setPasswordHidden((p) => !p)}
                type='button'
                className='absolute top-0 right-0 py-[5px] px-3'
              >
                {passwordHidden ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
              </button>
              {errors.password && (
                <div className='absolute left-0 flex items-center gap-1 text-sm text-red-500 select-none top-full'>
                  <div>{errors.password.message}</div>
                  <div className='text-gray-500'>
                    <Info
                      message='Password must contain at least one uppercase letter, one lowercase letter, and
                  one digit'
                    />
                  </div>
                </div>
              )}
              {/* {errors.password && (
                <div className='absolute left-0 text-sm text-red-500 top-full'>
                  {errors.password.message}
                </div>
              )} */}
            </div>
            <div className='relative flex items-center gap-2 pb-1 border-b-2 border-blue-500 '>
              <RiLockPasswordLine size={20} />
              <input
                {...register('confirmPassword')}
                type={confirmPasswordHidden ? 'password' : 'text'}
                className='w-[calc(100%_-_28px)] outline-none pr-11'
                placeholder='confirm password...'
              />
              <button
                onClick={() => setConfirmPasswordHidden((p) => !p)}
                type='button'
                className='absolute top-0 right-0 py-[5px] px-3'
              >
                {confirmPasswordHidden ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
              </button>
              {errors.confirmPassword && (
                <div className='absolute left-0 text-sm text-red-500 top-full'>
                  {errors.confirmPassword.message}
                </div>
              )}
            </div>

            {errors.root && (
              <div className='absolute left-0 flex items-center justify-center w-full gap-2 text-sm text-red-500 select-none bottom-[50px]'>
                {errors.root.message}
              </div>
            )}

            <button
              onClick={handleCatchImageError}
              className='flex items-center justify-center py-2 mt-5 text-white bg-blue-500 rounded-md'
            >
              {isSubmitting ? 'Creating...' : 'Create account'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
