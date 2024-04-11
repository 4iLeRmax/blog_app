'use client';

import clsx from 'clsx';
import React from 'react';
import { useFormStatus } from 'react-dom';

type SubmitButtonProps = {
  variants: {
    default: string;
    pending: string | React.ReactNode;
  };
};

export default function SubmitButton({ variants }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <>
      <button
        className={clsx(
          'flex items-center justify-center w-full px-5 py-2 text-white shadow-md rounded-xl',
          {
            'bg-blue-500': !pending,
            'bg-blue-400': pending,
          },
        )}
        type='submit'
        disabled={pending}
      >
        {pending ? variants.pending : variants.default}
      </button>
    </>
  );
}
