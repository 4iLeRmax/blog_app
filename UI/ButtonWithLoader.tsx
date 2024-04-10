import React from 'react';
import { useFormStatus } from 'react-dom';

type ButtonWithLoaderProps = {
  children: React.ReactNode;
  buttonClassName: string;
};

export default function ButtonWithLoader({ children, buttonClassName }: ButtonWithLoaderProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <div className='flex items-center justify-center h-8'>
          <div className='smallLoader-w-6'></div>
        </div>
      ) : (
        <button className={buttonClassName}>{children}</button>
      )}
    </>
  );
}
