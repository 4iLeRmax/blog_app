import BreadCrumbs from '@/components/BreadCrumbs';
import LastPosts from '@/components/LastPosts';
import Test1 from '@/components/Test1';
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
        <div>
          <LastPosts count={3} />
        </div>
      </div>
    </>
  );
}
