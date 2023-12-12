import clsx from 'clsx';
import React from 'react';

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className={clsx('w-full pt-[72px] px-[3%]', 'sm:px-[5%]', 'lg:px-[15%]')}>{children}</div>
  );
}
