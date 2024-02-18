import { getPost } from '@/lib/getPost';
import { NextRequest, NextResponse } from 'next/server';

type Params = {
  params: {
    id: string[];
  };
};

export const DELETE = async (req: NextRequest, { params: { id } }: Params) => {
  const postId = id[0];
  const commentId = id[1];
  // return NextResponse.json({ postId: id[0], commentId: id[1] });

  const post = await getPost(postId);
  const filteredComments = post.comments.filter((comment) => comment.id !== commentId);

  const res = await fetch(`http://localhost:4200/posts/${postId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ comments: filteredComments }),
  });

  await res.json();

  // this post not exist
  // this comment not exist
  // comment was deleted successfully
  return new NextResponse('ok');

  // await res.json();
  // if (res.ok) {
  //   return NextResponse.json(await getPost(postId));
  // }
};

export const POST = async (req: NextRequest) => {
  return new NextResponse(JSON.stringify({ text: 'bla-bla-bla' }), {
    headers: {
      'Content-Type': 'application/json',
    },
    status: 201
  });
};
