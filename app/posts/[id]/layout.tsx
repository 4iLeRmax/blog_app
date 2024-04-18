import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import BreadCrumbs from '@/components/BreadCrumbs';
import Comments from '@/components/Comments/Comments';
import { getPost } from '@/lib/getPost';
import { BrcsLinks, TPost } from '@/types';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import React from 'react';

type PostLayoutProps = {
  children: React.ReactNode;
  params: { id: string };
};

export async function generateMetadata({ params: { id } }: PostLayoutProps): Promise<Metadata> {
  const post = await getPost(id);

  return {
    title: post ? post.title : `Post ${id}`,
  };
}

export default async function PostLayout({ children, params: { id } }: PostLayoutProps) {
  const post = (await getPost(id)) as TPost;

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
      value: post ? post.title : `post ${id}`,
    },
  ];

  return (
    <>
      <div>
        <BreadCrumbs links={breadcrumbsLinks} />
        <div className='flex flex-col items-start w-full gap-5 md:flex-row '>
          <div className='w-full md:w-[calc(100%_-_320px_-_20px)] xl:w-[calc(100%_-_400px_-_20px)]'>
            {children}
          </div>
          <div className='w-full md:w-auto'>
            <div className='flex md:w-[320px] xl:w-[400px] w-full p-3 glassEffect'>
              <Comments post={post} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
