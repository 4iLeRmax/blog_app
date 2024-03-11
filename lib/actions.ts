'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { revalidatePath, unstable_noStore as noStore } from 'next/cache';
import { getPosts } from './getPosts';
import { redirect } from 'next/navigation';
import { getPost } from './getPost';
import { getReportComments } from './getReportComments';
import { sessionUserAlreadyLikedPost } from './sessionUserAlreadyLikedPost';

export const createPost = async (image: string, formData: FormData) => {
  const data = Object.fromEntries(formData.entries());

  const newPost = {
    id: Date.now().toString(),
    image,
    title: data.title,
    body: data.body,
    likes: [],
    comments: [],
    date: Date.now(),
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

      if (res.ok) {
        revalidatePath('/posts');
        redirect('/posts');
      }
      return { title: 'good' };
    } catch (err) {
      return { title: 'Error' };
    }
  }
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

  await res.json();

  revalidatePath('/posts');
  revalidatePath(`/posts/${postId}`);
  redirect(`/posts/${postId}`);
};
export const likePost = async (postId: string, formData: FormData) => {
  const session = await getServerSession(authOptions);
  const post = await getPost(postId);
  const sessionUserAlreadyLiked = await sessionUserAlreadyLikedPost(postId);

  // console.log(sessionUserAlreadyLiked);
  if (!sessionUserAlreadyLiked) {
    const updatedPost = {
      ...post,
      likes: [...post.likes, { email: session?.user?.email, name: session?.user?.name }],
    };
    const res = await fetch(`http://localhost:4200/posts/${postId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPost),
    });
  } else {
    const updatedPost = {
      ...post,
      likes: post.likes.filter(
        (el) => el.email !== session?.user?.email && el.name !== session?.user?.name,
      ),
    };
    const res = await fetch(`http://localhost:4200/posts/${postId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPost),
    });
  }

  revalidatePath('posts');
  revalidatePath(`posts${postId}`);
};

export const createComment = async (post: Post, formData: FormData) => {
  const session = await getServerSession(authOptions);
  const data = Object.fromEntries(formData.entries());

  const comment = {
    id: Date.now().toString(),
    userImage: session?.user?.image,
    username: session?.user?.name,
    comment: data.comment,
    replies: [],
    date: Date.now(),
  };
  // console.log(comment);

  const updatedPost = { ...post, comments: [comment, ...post.comments] };

  // console.log(updatedPost);

  const res = await fetch(`http://localhost:4200/posts/${post.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedPost),
  });

  if (res.ok) revalidatePath(`/posts/${post.id}`);
};
export const deleteComment = async (
  obj: { postId: string; commentId: string },
  formData: FormData,
) => {
  const { postId, commentId } = obj;

  const post = await getPost(postId);
  const filteredComments = post.comments.filter((comment) => comment.id !== commentId);
  const reportComments = await getReportComments();

  const deletedCommentHasReport = reportComments.find((el) => el.commentId === commentId);

  if (deletedCommentHasReport) {
    const res = await fetch(`http://localhost:4200/reportComments/${deletedCommentHasReport.id}`, {
      method: 'DELETE',
    });
  }

  const res = await fetch(`http://localhost:4200/posts/${postId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ comments: filteredComments }),
  });

  if (res.ok) {
    revalidatePath('/posts');
    revalidatePath(`/posts/${obj.postId}`);
    revalidatePath('/dashboard');
  }
};
export const reportComment = async (
  obj: { postId: string; commentId: string; replyId?: string },
  formData: FormData,
) => {
  const { postId, commentId, replyId } = obj;

  const session = await getServerSession(authOptions);
  const sessionUserInfo = {
    name: session?.user?.name,
    email: session?.user?.email,
  };

  const reportComments = await getReportComments();
  const repCommExist = reportComments.find(
    (repComm) => repComm.commentId === commentId && repComm.postId === postId,
  );
  const alreadyReported = repCommExist?.reporters.some(
    (reporter) =>
      reporter.name === sessionUserInfo.name && reporter.email === sessionUserInfo.email,
  );

  if (!repCommExist) {
    const reportComment = {
      id: Date.now().toString(),
      postId,
      commentId,
      replyId: replyId !== undefined ? replyId : null,
      reporters: [sessionUserInfo],
    };

    const res = await fetch('http://localhost:4200/reportComments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reportComment),
    });
  } else if (repCommExist) {
    if (!alreadyReported) {
      const res = await fetch(`http://localhost:4200/reportComments/${repCommExist.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reporters: [...repCommExist.reporters, sessionUserInfo],
        }),
      });
    }
  }
  revalidatePath(`/posts/${postId}`);
};
export const deleteReportComment = async (repCommId: string, formData: FormData) => {
  const res = await fetch(`http://localhost:4200/reportComments/${repCommId}`, {
    method: 'DELETE',
  });

  await res.json();
  if (res.ok) revalidatePath('/dashboard');
};

export const createReply = async (
  obj: { postId: string; commentId: string; replyToUser: string },
  formData: FormData,
) => {
  const session = await getServerSession(authOptions);
  const data = Object.fromEntries(formData.entries());

  const { postId, commentId, replyToUser } = obj;
  const post = await getPost(postId);
  const newReply = {
    id: Date.now().toString(),
    userImage: session?.user?.image,
    username: session?.user?.name,
    replyToUser,
    reply: data.comment,
    date: Date.now(),
  };

  const updatedComments = post.comments.map((comment) => {
    if (comment.id === commentId) {
      return { ...comment, replies: [...comment.replies, newReply] };
    } else return comment;
  });

  const updatedPost = { ...post, comments: updatedComments };

  const res = await fetch(`http://localhost:4200/posts/${postId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedPost),
  });

  await res.json();
  if (res.ok) revalidatePath(`/posts/${postId}`);
};
export const deleteReply = async (
  obj: { postId: string; commentId: string; replyId: string },
  formData: FormData,
) => {
  const { postId, commentId, replyId } = obj;
  const post = await getPost(postId);
  const reportComments = await getReportComments();

  const deletedReplyHasReport = reportComments.find((el) => el.replyId === replyId);

  if (deletedReplyHasReport) {
    const res = await fetch(`http://localhost:4200/reportComments/${deletedReplyHasReport.id}`, {
      method: 'DELETE',
    });
  }

  const updatedComments = post.comments.map((comment) => {
    if (comment.id === commentId) {
      return { ...comment, replies: comment.replies.filter((reply) => reply.id !== replyId) };
    } else return comment;
  });

  const updatedPost = { ...post, comments: updatedComments };

  const res = await fetch(`http://localhost:4200/posts/${postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedPost),
  });

  await res.json();

  if (res.ok) revalidatePath(`/posts/${postId}`);
  revalidatePath('/dashboard');
};
