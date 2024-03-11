import BreadCrumbs from '@/components/BreadCrumbs';
import { Metadata } from 'next';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import EditPersonalInfo from '@/components/EditPersonalInfo';

export const metadata: Metadata = {
  title: 'Profile',
};

const breadcrumbsLinks: BrcsLinks = [
  {
    link: '/',
    value: 'Home',
  },
  {
    link: '/profile',
    value: 'Profile',
  },
];

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) redirect('/');

  return (
    <>
      <div>
        <BreadCrumbs links={breadcrumbsLinks} />
        <div>
          {session?.user ? <EditPersonalInfo session={session}/> : null}
        </div>
      </div>
    </>
  );
}
