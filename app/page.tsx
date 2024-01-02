import BreadCrumbs from '@/components/BreadCrumbs';
import TextEditor from '@/components/TextEditor';
import { getPost } from '@/lib/getPost';
import React from 'react';

const breadCrumbsLinks = [
  {
    link: '/',
    value: 'Home',
  },
];

export default async function Home() {
  const post = await getPost('1701768145687');
  return (
    <>
      <div>
        <BreadCrumbs links={breadCrumbsLinks} />
        <div>
          <TextEditor post={post}/>
        </div>
      </div>
    </>
  );
}
