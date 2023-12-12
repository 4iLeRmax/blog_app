'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { getCurrentDate } from './getCurrentDate';
import { revalidatePath, unstable_noStore as noStore } from 'next/cache';
import { getPosts } from './getPosts';
import { redirect } from 'next/navigation';

export const createPost = async (image: string, formData: FormData) => {
  const data = Object.fromEntries(formData.entries());

  const newPost = {
    id: Date.now().toString(),
    image,
    title: data.title,
    body: data.body,
    date: getCurrentDate(),
    comments: [],
  };

  const posts = await getPosts();

  const postExist = posts.some((post) => post.title === newPost.title);
  // console.log(postExist);
  if (!postExist) {
    try {
      const res = await fetch('http://localhost:4200/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
      await res.json();
      return { title: 'good' };
    } catch (err) {
      return { title: 'Error' };
    }
  }
  revalidatePath('/posts');
};

export const deletePost = async (postId: string, formData: FormData) => {
  const res = await fetch(`http://localhost:4200/posts/${postId}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    revalidatePath('/posts');
    redirect('/posts');
  }
};

export const updatePost = async (postId: string, formData: FormData) => {
  const form = Object.fromEntries(formData.entries());

  const post = {
    title: form.title,
    body: form.body,
  };
  // console.log(post);

  const res = await fetch(`http://localhost:4200/posts/${postId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });

  revalidatePath('/posts');
  revalidatePath(`/posts/${postId}`);
  redirect(`/posts/${postId}`);
};

export const createComment = async (post: Post, formData: FormData) => {
  const session = await getServerSession(authOptions);
  const data = Object.fromEntries(formData.entries());

  const comment = {
    id: Date.now().toString(),
    userImage: session?.user?.image,
    username: session?.user?.name,
    comment: data.comment,
    date: getCurrentDate(),
  };
  // console.log(comment);

  const updatedPost = { ...post, comments: [...post.comments, comment] };

  const res = await fetch(`http://localhost:4200/posts/${post.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedPost),
  });

  if (res.ok) revalidatePath(`/posts/${post.id}`);
};
