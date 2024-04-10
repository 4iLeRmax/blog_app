'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { revalidatePath, unstable_noStore as noStore } from 'next/cache';
import { getPosts } from './getPosts';
import { redirect } from 'next/navigation';
import { getPost } from './getPost';
import { getReportComments } from './getReportComments';
import { sessionUserAlreadyLikedPost } from './sessionUserAlreadyLikedPost';
import { getContactInfo } from './getContactInfo';
import { userIsAdmin } from './userIsAdmin';
import prisma from './prisma';

export const updateSocialMediaLinks = async (
  formData: FormData,
  socialMedia: {
    label: string;
    link: string;
  }[],
) => {
  const isAdmin = await userIsAdmin();
  const contactInfo = await getContactInfo();
  const socialMediaLinksExist = contactInfo?.SocialMediaLinks !== undefined;

  if (isAdmin) {
    if (socialMediaLinksExist) {
      //UPDATE
      console.log('UPDATE');
      console.log(socialMedia);

      const res1 = await prisma.socialMediaLink.deleteMany();
      const res2 = await prisma.contactInfo.update({
        where: {
          id: contactInfo.id,
        },
        data: {
          SocialMediaLinks: {
            createMany: {
              data: socialMedia,
            },
          },
        },
      });
      // console.log(res);
    } else {
      //CREATE
      console.log('CREATE');
      const res = await prisma.contactInfo.create({
        data: {
          SocialMediaLinks: {
            createMany: {
              data: socialMedia,
            },
          },
        },
      });
    }
  }
  revalidatePath('/dashboard');
};
export const updateContactInfo = async (formData: FormData) => {
  type ContactInfoForm = {
    address: string | null;
    number: string | null;
    contactMail: string | null;
  };
  const { address, number, contactMail } = Object.fromEntries(
    formData.entries(),
  ) as ContactInfoForm;

  const isAdmin = await userIsAdmin();

  const contactInfo = await getContactInfo();
  const contactInfoExist = contactInfo !== undefined;

  const updatedContactInfo: ContactInfoForm = {
    address: address !== '' ? address : null,
    number: number !== '' ? number : null,
    contactMail: contactMail !== '' ? contactMail : null,
  };

  if (isAdmin) {
    if (contactInfoExist) {
      // UPDATE
      const res = await prisma.contactInfo.update({
        where: {
          id: contactInfo.id,
        },
        data: {
          ...updatedContactInfo,
        },
      });
    } else {
      //CREATE
      const res = await prisma.contactInfo.create({
        data: {
          ...updatedContactInfo,
        },
      });
    }
  }

  revalidatePath('/dashboard');
};

export const createPost = async (image: string, formData: FormData) => {
  type TForm = {
    title: string;
    body: string;
  };
  const { title, body } = Object.fromEntries(formData.entries()) as TForm;
  const posts = await getPosts();
  const postExist = posts !== undefined ? posts.some((post) => post.title === title) : false;

  if (!postExist) {
    try {
      const res = await prisma.posts.create({
        data: {
          image,
          title,
          body,
        },
      });
    } catch {
      console.error('Create Post');
    }
  }
  revalidatePath('/posts');
  redirect('/posts');
};
export const deletePost = async (postId: string, formData: FormData) => {
  const reportComment = await getReportComments();
  const relatedReportComments = reportComment?.filter((el) => el.postId === postId);

  if (relatedReportComments && relatedReportComments.length > 0) {
    const res = await prisma.reportComment.deleteMany({
      where: {
        id: {
          in: [...relatedReportComments.map((el) => el.id)],
        },
      },
    });
  }
  const res = await prisma.posts.delete({ where: { id: postId } });

  revalidatePath('/posts');
  redirect('/posts');
};
export const updatePost = async (postId: string, formData: FormData) => {
  const { title, body } = Object.fromEntries(formData.entries()) as {
    title: string;
    body: string;
  };

  const res = await prisma.posts.update({
    where: {
      id: postId,
    },
    data: {
      title,
      body,
    },
  });

  revalidatePath('/posts');
  revalidatePath(`/posts/${postId}`);
  redirect(`/posts/${postId}`);

  // const form = Object.fromEntries(formData.entries());

  // const post = {
  //   title: form.title,
  //   body: form.body,
  // };
  // // console.log(post);

  // const res = await fetch(`http://localhost:4200/posts/${postId}`, {
  //   method: 'PATCH',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(post),
  // });

  // await res.json();

  // revalidatePath('/posts');
  // revalidatePath(`/posts/${postId}`);
  // redirect(`/posts/${postId}`);
};
export const likePost = async (postId: string, formData?: FormData) => {
  const session = await getServerSession(authOptions);
  const sessionUserAlreadyLiked = await sessionUserAlreadyLikedPost(postId);
  const post = await getPost(postId);

  if (!sessionUserAlreadyLiked) {
    const res = await prisma.posts.update({
      where: {
        id: postId,
      },
      data: {
        Likes: {
          create: {
            email: session?.user?.email as string,
            name: session?.user?.name as string,
          },
        },
      },
    });
  } else {
    const likesToBeDeleted = post?.Likes.find((like) => like.email === session?.user?.email);
    if (likesToBeDeleted) {
      const res = await prisma.posts.update({
        where: {
          id: postId,
        },
        data: {
          Likes: {
            delete: {
              id: likesToBeDeleted.id,
            },
          },
        },
      });
    }
  }

  revalidatePath('posts');
  revalidatePath(`posts${postId}`);
};

export const createComment = async (postId: string, formData: FormData) => {
  const session = await getServerSession(authOptions);
  const comment = Object.fromEntries(formData.entries()).comment as string;

  const res = await prisma.posts.update({
    where: { id: postId },
    data: {
      Comments: {
        create: {
          userImage: session?.user?.image as string,
          username: session?.user?.name as string,
          comment,
        },
      },
    },
  });

  revalidatePath(`/posts/${postId}`);
};
export const deleteComment = async (
  obj: { postId: string; commentId: string },
  formData: FormData,
) => {
  const { postId, commentId } = obj;
  const reportComments = await getReportComments();

  const currentCommentWithReport = reportComments?.find((el) => el.commentId === commentId);

  console.log(currentCommentWithReport);

  if (currentCommentWithReport) {
    // console.log('DELETE Reports');
    const res = await prisma.reportComment.delete({
      where: {
        id: currentCommentWithReport.id,
      },
    });
  }
  const res = await prisma.comments.delete({ where: { id: commentId } });
  // console.log('DELETE comment');

  revalidatePath('/posts');
  revalidatePath(`/posts/${postId}`);
  revalidatePath('/dashboard');
};

export const createReply = async (
  obj: { postId: string; commentId: string; replyToUser: string },
  formData: FormData,
) => {
  const session = await getServerSession(authOptions);
  const reply = Object.fromEntries(formData.entries()).comment as string;

  const { postId, commentId, replyToUser } = obj;

  if (session?.user) {
    const res = await prisma.posts.update({
      where: {
        id: postId,
      },
      data: {
        Comments: {
          update: {
            where: { id: commentId },
            data: {
              Replies: {
                create: {
                  userImage: session.user.image as string,
                  username: session.user.name as string,
                  replyToUser,
                  reply,
                },
              },
            },
          },
        },
      },
    });
  }
  revalidatePath(`/posts/${postId}`);
};
export const deleteReply = async (
  obj: { postId: string; commentId: string; replyId: string },
  formData: FormData,
) => {
  const { postId, commentId, replyId } = obj;
  const reportComments = await getReportComments();

  const currentReplyWithReport = reportComments?.find((el) => el.replyId === replyId);

  if (currentReplyWithReport) {
    const res = await prisma.reportComment.delete({
      where: {
        id: currentReplyWithReport.id,
      },
    });
  }

  const res = await prisma.replies.delete({
    where: {
      id: replyId,
    },
  });
  revalidatePath(`/posts/${postId}`);
  revalidatePath('/dashboard');
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
  } as { name: string; email: string };

  const reportComments = await getReportComments();
  const repCommExist = reportComments?.find(
    (el) => el.commentId === commentId && el.postId === postId,
  );
  const isReportedBySessionUser = repCommExist?.Reporters.some(
    (reporter) =>
      reporter.name === sessionUserInfo.name && reporter.email === sessionUserInfo.email,
  );

  if (!repCommExist) {
    console.log('CREATE');
    const res = await prisma.reportComment.create({
      data: {
        postId,
        commentId,
        replyId: replyId ?? null,
        Reporters: {
          create: {
            ...sessionUserInfo,
          },
        },
      },
    });
  } else if (repCommExist) {
    if (!isReportedBySessionUser) {
      console.log('UPDATE');

      const res = await prisma.reportComment.update({
        where: {
          id: repCommExist.id,
        },
        data: {
          Reporters: {
            create: {
              ...sessionUserInfo,
            },
          },
        },
      });
    }
  }
  revalidatePath(`/posts/${postId}`);
};
export const deleteReportComment = async (repCommId: string, formData: FormData) => {
  const res = await prisma.reportComment.delete({
    where: { id: repCommId },
  });

  revalidatePath('/dashboard');
};
