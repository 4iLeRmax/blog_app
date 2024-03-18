import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { likePost } from '@/lib/actions';
import { sessionUserAlreadyLikedPost } from '@/lib/sessionUserAlreadyLikedPost';
import { getServerSession } from 'next-auth';
import React from 'react';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';

type LikesProps = {
  postId: string;
  likes: { email: string; name: string }[];
};

export default async function Likes({ postId, likes }: LikesProps) {
  const session = await getServerSession(authOptions);

  const sessionUserAlreadyLiked = await sessionUserAlreadyLikedPost(postId);
  return (
    <>
      <div className='flex items-center gap-1 text-primary-color'>
        {session?.user ? (
          <form action={likePost.bind(null, postId)}>
            <button>
              {sessionUserAlreadyLiked ? <IoMdHeart size={30} /> : <IoMdHeartEmpty size={30} />}
            </button>
          </form>
        ) : (
          <div>
            <IoMdHeart size={30} />
          </div>
        )}
        <p>{likes.length}</p>
      </div>
    </>
  );
}
