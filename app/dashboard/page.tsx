import React from 'react';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

import { BrcsLinks } from '@/types';

import { getUsers } from '@/lib/getUsers';
import { getPosts } from '@/lib/getPosts';
import { userIsAdmin } from '@/lib/userIsAdmin';
import { getContactInfo } from '@/lib/getContactInfo';

import BreadCrumbs from '@/components/BreadCrumbs';
import UsersList from '@/components/UsersList';
import CreatePost from '@/components/CreatePost';
import ReportComments from '@/components/ReportComments';
import TabsComponent from '@/components/TabsComponent';
import EditContactInfo from '@/components/EditContactInfo';

export const metadata: Metadata = {
  title: 'Dashboard',
};

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
  const users = await getUsers();
  const posts = await getPosts();
  const contactInfo = await getContactInfo();
  const isAdmin = await userIsAdmin();

  if (!isAdmin) redirect('/');

  const tabs = [
    { title: 'Create Post', content: <CreatePost posts={posts} /> },
    { title: 'Contact info', content: <EditContactInfo contactInfo={contactInfo} /> },
    { title: 'Users', content: <UsersList users={users} /> },
    { title: 'Reported comments', content: <ReportComments /> },
  ];
  return (
    <>
      <div>
        <BreadCrumbs links={breadcrumbsLinks} />
        <div>
          <TabsComponent tabs={tabs} />
        </div>
      </div>
    </>
  );
}
