'use client';

import clsx from 'clsx';
import { signIn, signOut } from 'next-auth/react';
import React, { FC } from 'react';

type ButtonProps = {
  image?: React.ReactNode;
  children: React.ReactNode;
  sign?: 'SignIn' | 'SignOut';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
1;
const Button: FC<ButtonProps> = ({ children, image, type, sign, className, ...rest }) => {
  return (
    <button
      {...rest}
      onClick={() => (sign === 'SignIn' ? signIn() : sign === 'SignOut' ? signOut() : null)}
      type={type ?? 'button'}
      className={clsx('flex justify-center items-center gap-1 ', `${className}`)}
    >
      {children}
    </button>
  );
};

export default Button;
