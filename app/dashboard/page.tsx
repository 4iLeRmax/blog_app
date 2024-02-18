import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import BreadCrumbs from '@/components/BreadCrumbs';
import UsersList from '@/components/UsersList';
import CreatePost from '@/components/CreatePost';
import { getUsers } from '@/lib/getUsers';
import { getGithubUsers } from '@/lib/GithubUsers';
import { getReportComments } from '@/lib/getReportComments';

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
  const reportComments = await getReportComments();

  const commonUsers = users.concat(githubUsers);

  // const post

  if (session?.user.role !== 'admin') redirect('/');
  return (
    <>
      <div>
        <BreadCrumbs links={breadcrumbsLinks} />
        <div>
          <CreatePost />
          <div className='pt-10'>
            <UsersList commonUsers={commonUsers} />
          </div>

          <div>
            {reportComments.length > 0 ? (
              <div>
                {reportComments.map((el) => (
                  <div key={el.id}>
                    <div>{el.commentId}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div>No Reports</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
