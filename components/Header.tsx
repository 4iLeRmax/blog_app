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
import HeaderLinks from './HeaderLinks';
import ThemeSwitcher from '@/UI/ThemeSwitcher';

export default async function Header() {
  const session: { user: SessionUser } | null = await getServerSession(authOptions);
  const posts = await getPosts();

  return (
    <>
      <div
        className={clsx(
          'fixed z-20 top-0 left-0 w-full py-3 px-[3%]',
          'sm:px-[5%]',
          'lg:px-[10%] xl:px-[15%]',
        )}
        // className={clsx('fixed z-20 top-0 left-0 w-full py-0 px-0', 'sm:px-[5%]', 'lg:px-[15%]')}
      >
        <div className='relative flex items-center justify-between w-full gap-3 px-4 py-2 font-semibold md:px-8 md:py-3 glassEffect'>
          {/* {session ? <HeaderLinks sessionUser={session.user} /> : null} */}
          <HeaderLinks sessionUser={session?.user} />

          <div className='flex items-center justify-center w-full gap-3 sm:gap-5 sm:w-auto '>
            <div className='hidden sm:flex'>
              <ThemeSwitcher />
            </div>
            <Search posts={posts} />
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
