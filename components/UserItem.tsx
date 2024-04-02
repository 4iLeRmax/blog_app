import { User } from '@/types';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

type UserItemProps = {
  user: User;
};

export default function UserItem({ user }: UserItemProps) {
  return (
    <>
      <div className='flex items-center justify-between w-full pr-3 bg-white rounded-xl'>
        <div className='flex items-center gap-2'>
          {user.image ? (
            <div className='relative w-12 h-12 overflow-hidden shadow-md rounded-xl'>
              <Image src={user.image} alt='' fill className='object-cover' />
            </div>
          ) : (
            <div className='flex items-center justify-center w-12 h-12 text-white bg-gray-800 shadow-md rounded-xl'>
              ?
            </div>
          )}
          <div className='flex flex-col'>
            <h1>{user.name}</h1>
            <div>{user.email}</div>
          </div>
        </div>

        <div
          className={clsx('text-xl ', {
            'text-red-600': user.role === 'ADMIN',
            'text-green-600': user.role === 'USER',
          })}
        >
          {user.role}
        </div>
      </div>
    </>
  );
}
