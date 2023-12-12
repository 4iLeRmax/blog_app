import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import BreadCrumbs from '@/components/BreadCrumbs';
import Comments from '@/components/Comments/Comments';
import { getPost } from '@/lib/getPost';
import { getServerSession } from 'next-auth';
import React from 'react';

type PostLayoutProps = {
  children: React.ReactNode;
  params: { id: string };
};

export default async function PostLayout({ children, params: { id } }: PostLayoutProps) {
  const post: Post = await getPost(id);
  const session = await getServerSession(authOptions);

  const isAdmin = session?.user
    ? (session?.user as SessionUser).role === 'admin'
      ? true
      : false
    : false;

  const breadcrumbsLinks: BrcsLinks = [
    {
      link: '/',
      value: 'Home',
    },
    {
      link: '/posts',
      value: 'Posts',
    },
    {
      link: `/posts/${id}`,
      value: post.title,
    },
  ];

  return (
    <>
      <div>
        <BreadCrumbs links={breadcrumbsLinks} />
        <div className='flex items-start w-full gap-5'>
          {children}

          <div>
            <div className='p-3 glassEffect w-[380px]'>
              <Comments post={post} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
