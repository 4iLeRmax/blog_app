import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import BreadCrumbs from '@/components/BreadCrumbs';
import UsersList from '@/components/UsersList';
import CreatePost from '@/components/CreatePost';
import { getUsers } from '@/lib/getUsers';
import { getGithubUsers } from '@/lib/GithubUsers';
import { getPosts } from '@/lib/getPosts';
import ReportComments from '@/components/ReportComments';
import { Metadata } from 'next';
import TabsComponent from '@/components/TabsComponent';

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
  const session: { user: SessionUser } | null = await getServerSession(authOptions);
  const users = (await getUsers()) as UserItem[];
  const githubUsers = (await getGithubUsers()) as UserItem[];
  const posts = await getPosts();
  const commonUsers = users.concat(githubUsers);

  // const post

  if (session?.user.role !== 'admin') redirect('/');

  const tabs = [
    { title: 'Create Post', content: <CreatePost posts={posts} /> },
    { title: 'Users', content: <UsersList commonUsers={commonUsers} /> },
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
