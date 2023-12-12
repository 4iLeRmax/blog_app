import Button from '@/UI/Button';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { CiLogin } from 'react-icons/ci';
import Avatar from './Avatar';
import Search from './Search/Search';
import { getPosts } from '@/lib/getPosts';

export default async function Header() {
  const session: { user: SessionUser } | null = await getServerSession(authOptions);
  const posts = await getPosts();

  return (
    <>
      <div
        className={clsx('fixed z-20 top-0 left-0 w-full py-3 px-[3%]', 'sm:px-[5%]', 'lg:px-[15%]')}
      >
        <div className='flex items-center justify-between w-full gap-5 px-8 py-3 font-semibold glassEffect'>
          <div className='flex items-center gap-3'>
            <Link href={'/'}>Home</Link>
            <Link href={'/posts'}>Posts</Link>
            {session?.user?.role === 'admin' ? <Link href={'/dashboard'}>Dashboard</Link> : null}
          </div>

          <div className='flex items-center justify-center gap-3 '>
            <Search posts={posts}/>
            {session?.user ? (
              <Avatar user={session.user} />
            ) : (
              <Button sign='SignIn'>
                <CiLogin />
                <div>Sign in</div>
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
