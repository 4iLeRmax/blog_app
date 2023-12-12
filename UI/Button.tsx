'use client';

import clsx from 'clsx';
import { signIn, signOut } from 'next-auth/react';
import React, { FC, forwardRef } from 'react';

type ButtonProps = {
  image?: React.ReactNode;
  children: React.ReactNode;
  customStyles?: string;
  sign?: 'SignIn' | 'SignOut';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

// const Button: FC<ButtonProps> = forwardRef(
//   ({ children, image, customStyles, sign, ...rest }, ref: React.Ref<HTMLButtonElement>) => {
//     return (
//       <button
//         {...rest}
//         ref={ref}
//         onClick={() => (sign === 'SignIn' ? signIn() : sign === 'SignOut' ? signOut() : null)}
//         className={clsx('flex justify-center items-center gap-1 ', {})}
//       >
//         {children}
//       </button>
//     );
//   },
// );
const Button: FC<ButtonProps> = ({ children, image, customStyles, type, sign, ...rest }) => {
  return (
    <button
      {...rest}
      onClick={() => (sign === 'SignIn' ? signIn() : sign === 'SignOut' ? signOut() : null)}
      type={type ?? 'button'}
      className={clsx('flex justify-center items-center gap-1 ', {customStyles})}
    >
      {children}
    </button>
  );
};

export default Button;
