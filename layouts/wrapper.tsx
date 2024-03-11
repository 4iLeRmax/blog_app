import clsx from 'clsx';
import React from 'react';

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className={clsx('w-full px-[3%]', 'sm:px-[5%]', 'lg:px-[10%]', 'xl:px-[15%]')}>{children}</div>
  );
}
