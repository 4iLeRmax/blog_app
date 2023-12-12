import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

type UserItemProps = {
  user: UserItem;
};

export default function UserItem({ user }: UserItemProps) {
  return (
    <>
      <div className='flex items-center justify-between w-full px-3 glassEffect'>
        <div className='flex items-center gap-2'>
          {user.image ? (
            <div className='relative w-10 h-10 overflow-hidden shadow-md rounded-xl'>
              <Image src={user.image} alt='' fill className='object-cover' />
            </div>
          ) : (
            <div className='flex items-center justify-center w-10 h-10 text-white shadow-md bg-blue-200/80 rounded-xl'>
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
            'text-red-600': user.role === 'admin',
            'text-green-600': user.role === 'user',
          })}
        >
          {user.role}
        </div>
      </div>
    </>
  );
}
