import BreadCrumbs from '@/components/BreadCrumbs';
import TextEditor from '@/components/TextEditor';
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
          <TextEditor />
        </div>
      </div>
    </>
  );
}
