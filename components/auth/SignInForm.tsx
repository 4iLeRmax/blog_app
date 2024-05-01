'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';

import { MdOutlineMail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

import { schema } from '@/lib/schemes/signInFormSchema';
import { socialMediaLogos } from '@/data';
import { User } from '@/types';
import Info from '@/UI/Info';

type Inputs = {
  email: string;
  password: string;
};

export default function SignInForm() {
  console.log(process.env.baseURL);

  const [passwordHidden, setPasswordHidden] = useState(true);
  const { refresh } = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({ resolver: zodResolver(schema, { async: true }, { mode: 'async' }) });

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    const user: User | null = await fetch(`${process.env.baseURL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type: 'email', data: email }),
    }).then((res) => res.json());
    if (!user) {
      setError('email', { message: 'User with this email not exists.' });
    } else if (user && user.password === null) {
      setError('root', { message: 'Incorrect Data' });
    } else if (user && user.password !== password) {
      setError('password', { message: 'Incorrect password' });
    }

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    if (res?.ok) refresh();
  };

  return (
    <>
      <div className='flex flex-col gap-5 h-[376px] xs:h-[424px] '>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                  {errors.password.message === 'Invalid password' ? (
                    <div className='text-gray-500'>
                      <Info
                        message='Password must contain at least one uppercase letter, one lowercase letter, and
              one digit'
                      />
                    </div>
                  ) : null}
                </div>
              )}
            </div>
            {errors.root && (
              <div className='absolute left-0 flex items-center justify-center w-full gap-2 text-sm text-red-500 select-none bottom-[50px]'>
                {errors.root.message}
              </div>
            )}

            <button className='flex items-center justify-center py-2 mt-5 text-white bg-blue-500 rounded-md'>
              {isSubmitting ? 'Entering...' : 'Sign In'}
            </button>
          </div>
        </form>
        <div className='flex items-center gap-3'>
          <div className='w-full h-0.5 bg-gray-200'></div>
          <div>or</div>
          <div className='w-full h-0.5 bg-gray-200'></div>
        </div>
        <button
          onClick={() => signIn('github')}
          className='text-white rounded-md bg-[#171717] py-2 flex items-center gap-2 justify-center'
        >
          {socialMediaLogos['github']}
          Sign In With GitHub
        </button>
      </div>
    </>
  );
}
