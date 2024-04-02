import { userIsAdmin } from '@/lib/userIsAdmin';
import Image from 'next/image';
import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import LinkChecker from './LinkChecker';
import CommentMoreInfo from './CommentMoreInfo';
import { getReportComments } from '@/lib/getReportComments';
import CommentReplies from './CommentReplies';
import { formatTimeAgo } from '@/lib/formatTimeAgo';
import { getCurrentDate } from '@/lib/getCurrentDate';
import { Comm, ReportComment } from '@/types';

type UserCommentProps = {
  comment: Comm;
  postId: string;
};

export default async function UserComment({ comment, postId }: UserCommentProps) {
  const isAdmin = await userIsAdmin();
  const session = await getServerSession(authOptions);
  const reportComments = await getReportComments();

  const reportedCommentsFromCurrentSessionUser = reportComments
    ?.filter((repComm) => repComm.postId === postId)
    .filter((repComment) =>
      repComment.Reporters.some(
        (reporter) =>
          reporter.name === session?.user?.name && reporter.email === session?.user?.email,
      ),
    ) as ReportComment[]

  const linkChecker = (text: string) => {
    return (
      <>
        {text.split(' ').map((word, i, arr) =>
          /(https?:\/\/[^\s]+)/g.test(word) ? ( //reg exp !!!
            <>
              <LinkChecker link={word} />
              <> </>
            </>
          ) : arr.length > i + 1 ? (
            `${word} `
          ) : (
            word
          ),
        )}
      </>
    );
  };

  // console.log(comment);

  return (
    <>
      <div className='relative p-2 bg-white rounded-xl' key={comment.id}>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            {comment.userImage ? (
              <div className='relative w-8 h-8 overflow-hidden rounded-md'>
                <Image src={comment.userImage} alt='' fill className='object-cover' />
              </div>
            ) : (
              <div className='flex items-center justify-center w-8 h-8 text-white bg-gray-800 rounded-xl'>
                ?
              </div>
            )}
            <div>{comment.username}</div>
          </div>

          <h1 title={getCurrentDate(comment.date)} className={session?.user ? 'mr-10' : ''}>
            {formatTimeAgo(comment.date)}
          </h1>
          {session?.user ? (
            <CommentMoreInfo
              sessionUser={session.user}
              isAdmin={isAdmin}
              postId={postId}
              comment={comment}
              reportedCommentsFromCurrentSessionUser={reportedCommentsFromCurrentSessionUser}
            />
          ) : null}
        </div>
        <div className='pt-2 break-words'>{linkChecker(comment.comment)}</div>

        <CommentReplies
          postId={postId}
          comment={comment}
          session={session}
          isAdmin={isAdmin}
          sessionUsername={session?.user?.name}
          reportedCommentsFromCurrentSessionUser={reportedCommentsFromCurrentSessionUser}
        />
      </div>
    </>
  );
}
