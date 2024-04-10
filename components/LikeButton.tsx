'use client';

import { likePost } from '@/lib/actions';
import React, { useState } from 'react';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';

type LikeButtonProps = {
  postId: string;
  sessionUserAlreadyLiked: boolean;
};

export default function LikeButton({ postId, sessionUserAlreadyLiked }: LikeButtonProps) {
  const [liked, setLiked] = useState(sessionUserAlreadyLiked);

  const handleClick = async () => {
    setLiked((p) => !p);
    await likePost(postId);
  };

  return (
    <>
      {/* <form action={handleSubmit}> */}
      {/* <form action={likePost.bind(null, postId)}> */}
      <button onClick={handleClick}>
        {liked ? <IoMdHeart size={30} /> : <IoMdHeartEmpty size={30} />}
      </button>
      {/* </form> */}
    </>
  );
}
