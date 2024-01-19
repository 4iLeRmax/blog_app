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
      </div>
    </>
  );
}
