import React from 'react';
import { useFormStatus } from 'react-dom';

type ButtonWithLoaderProps = {
  children: React.ReactNode;
  buttonClassName: string;
  size?: '6' | '8';
};

export default function ButtonWithLoader({
  children,
  buttonClassName,
  size = '6',
}: ButtonWithLoaderProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <div className='flex items-center justify-center h-8'>
          <div className={size == '6' ? 'smallLoader-w-6' : 'smallLoader-w-8'}></div>
        </div>
      ) : (
        <button className={buttonClassName}>{children}</button>
      )}
    </>
  );
}
