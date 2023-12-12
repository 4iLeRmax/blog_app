import React from 'react';
import UserComment from './UserComment';
import CommentForm from './CommentForm';

type CommentsProps = {
  post: Post;
};

export default function Comments({ post }: CommentsProps) {
  return (
    <>
      <div className='flex flex-col w-full gap-5'>
        <CommentForm post={post} />
        <div className='flex flex-col w-full gap-2'>
          {post.comments.length > 0 ? (
            post.comments.map((comment) => <UserComment key={comment.id} comment={comment} />)
          ) : (
            <div className='flex items-center justify-center'>No Comments</div>
          )}
        </div>
      </div>
    </>
  );
}
