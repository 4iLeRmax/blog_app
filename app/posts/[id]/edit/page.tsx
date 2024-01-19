import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getPost } from '@/lib/getPost';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';
import { updatePost } from '@/lib/actions';
import UpdatePostForm from '@/components/UpdatePostForm';
import TextEditor from '@/components/TextEditor';

export default async function EditPost({ params: { id } }: any) {
  const post: Post = await getPost(id);
  const session: { user: SessionUser } | null = await getServerSession(authOptions);

  const isAdmin = session?.user ? (session?.user.role === 'admin' ? true : false) : false;

  if (!isAdmin) redirect(`/posts/${id}`);

  return (
    <>
      <div className='relative w-[calc(100%_-_400px)] p-3 glassEffect flex flex-col gap-5 text-black'>
        {post.image ? (
          <div className='relative w-full overflow-hidden h-80 rounded-xl'>
            <Image src={post.image} alt='' fill className='object-cover' />
          </div>
        ) : null}
        {post ? <UpdatePostForm post={post} /> : null}
      </div>
    </>
  );
}
