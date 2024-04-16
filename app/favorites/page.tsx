import BreadCrumbs from '@/components/BreadCrumbs';
import prisma from '@/lib/prisma';
import { BrcsLinks, SessionUser } from '@/types';
import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/options';
import PostItem from '@/components/PostItem';
import { redirect } from 'next/navigation';
import { getFavoritePosts } from '@/lib/getFavoritePosts';

const breadcrumbsLinks: BrcsLinks = [
  {
    link: '/',
    value: 'Home',
  },
  {
    link: '/favorites',
    value: 'Favorites',
  },
];

export default async function FavoritesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) redirect('/');

  const favoritePosts = await getFavoritePosts((session?.user as SessionUser).id);
  // console.log(favoritePosts);

  return (
    <>
      <div>
        <BreadCrumbs links={breadcrumbsLinks} />
        <div>
          {favoritePosts && favoritePosts.length > 0 ? (
            <div className='grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4'>
              {favoritePosts.map((post) => (
                <div key={post.id} className='border-0 glassEffect rounded-xl'>
                  <PostItem post={post} />
                </div>
              ))}
            </div>
          ) : (
            <div className='flex items-center justify-center mt-10 text-primary-color'>
              There will be your favorite posts
            </div>
          )}
        </div>
      </div>
    </>
  );
}
