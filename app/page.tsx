import TE from '@/components/1/TE';
import BreadCrumbs from '@/components/BreadCrumbs';
import React from 'react';

const breadCrumbsLinks = [
  {
    link: '/',
    value: 'Home',
  },
];

export default function Home() {
  return (
    <>
      <div>
        <BreadCrumbs links={breadCrumbsLinks} />
        <TE />
        <div className='w-[300px] border-2'>
          <div className='indent-[150px] break-words'>
            1111111111111111111111111111111111111111111111111111111111111111111111111111 sdfsdfs d
            sdfsdfs 11111111111111111111111111111111111111111111
          </div>
        </div>
      </div>
    </>
  );
}
