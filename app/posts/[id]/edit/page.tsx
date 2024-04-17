import { getPost } from '@/lib/getPost';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';
import { updatePost } from '@/lib/actions';
import PostForm from '@/components/PostForm';
import { userIsAdmin } from '@/lib/userIsAdmin';

export default async function EditPost({ params: { id } }: any) {
  const isAdmin = await userIsAdmin();
  if (!isAdmin) redirect(`/posts/${id}`);

  const post = await getPost(id);

  return (
    <>
      {post ? (
        <div className='relative flex flex-col w-full gap-5 p-3 text-black glassEffect'>
          {post.image ? (
            <div className='relative w-full overflow-hidden h-80 rounded-xl'>
              <Image src={post.image} alt='' fill className='object-cover' />
            </div>
          ) : null}
          {post ? (
            <PostForm
              post={post}
              submitButtonVariants={{ default: 'Update', pending: 'Updating...' }}
              withCancelButton
              action={updatePost.bind(null, post.id)}
            />
          ) : null}
        </div>
      ) : null}
    </>
  );
}
