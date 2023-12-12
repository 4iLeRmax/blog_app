import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import BreadCrumbs from '@/components/BreadCrumbs';
import UsersList from '@/components/UsersList';
import CreatePost from '@/components/CreatePost';

const breadcrumbsLinks: BrcsLinks = [
  {
    link: '/',
    value: 'Home',
  },
  {
    link: '/dashboard',
    value: 'Dashboard',
  },
];

export default async function DashboardPage() {
  const session: { user: SessionUser } | null = await getServerSession(authOptions);

  if (session?.user.role !== 'admin') redirect('/');
  return (
    <>
      <div>
        <BreadCrumbs links={breadcrumbsLinks} />
        <div>
          <CreatePost />
          <UsersList />
        </div>
      </div>
    </>
  );
}
