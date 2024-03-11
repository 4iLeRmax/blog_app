import { formatTimeAgo } from '@/lib/formatTimeAgo';
import { getCurrentDate } from '@/lib/getCurrentDate';
import { getPost } from '@/lib/getPost';
import { getReportComments } from '@/lib/getReportComments';
import Image from 'next/image';
import React from 'react';
import LinkChecker from './Comments/LinkChecker';
import MoreInfo from './MoreInfo';
import ReportedCommentMoreInfoModal from './Modals/ReportedCommentMoreInfoModal';
import ReportersList from './ReportersList';

export default async function ReportComments() {
  const reportComments = await getReportComments();

  const reportedComments = await Promise.all(
    reportComments.map(async (el) => {
      const post = await getPost(el.postId);
      const comment = post.comments.find((comm) => comm.id === el.commentId);

      let reportedComment: RepCommUI = {
        id: '',
        pathId: {
          postId: '',
          commentId: '',
          replyId: '',
        },
        userImage: '',
        username: '',
        comment: '',
        reporters: [
          {
            name: '',
            email: '',
          },
        ],
        date: 0,
      };

      if (comment !== undefined) {
        if (el.replyId !== null) {
          const reply = comment?.replies.find((reply) => reply.id === el.replyId);
          if (reply !== undefined) {
            reportedComment = {
              id: el.id,
              pathId: {
                postId: el.postId,
                commentId: el.commentId,
                replyId: el.replyId,
              },
              userImage: reply?.userImage,
              username: reply?.username,
              comment: reply?.reply,
              reporters: el.reporters,
              date: reply?.date,
            };
          }
        } else if (el.replyId === null) {
          reportedComment = {
            id: el.id,
            pathId: {
              postId: el.postId,
              commentId: el.commentId,
              replyId: null,
            },
            userImage: comment?.userImage,
            username: comment?.username,
            comment: comment?.comment,
            reporters: el.reporters,
            date: comment?.date,
          };
        }
      }

      // console.log(reportedComment);
      return reportedComment;
    }),
  );

  return (
    <>
      {reportComments.length > 0 ? (
        <div className='grid grid-cols-1 gap-2 p-2 md:grid-cols-2 xl:grid-cols-3 glassEffect'>
          {reportedComments.map((el) => (
            <div className='relative p-2 bg-white rounded-xl' key={el.id}>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  {el.userImage ? (
                    <div className='relative w-8 h-8 overflow-hidden rounded-md'>
                      <Image src={el.userImage} alt='' fill className='object-cover' />
                    </div>
                  ) : (
                    <div className='flex items-center justify-center w-8 h-8 text-white bg-gray-800 rounded-xl'>
                      ?
                    </div>
                  )}
                  <div>{el.username}</div>
                </div>

                <h1 title={getCurrentDate(el.date)} className='mr-10'>
                  {formatTimeAgo(el.date)}
                </h1>

                <div className='absolute z-10 top-2 right-2'>
                  <MoreInfo>
                    <ReportedCommentMoreInfoModal reportedComment={el} />
                  </MoreInfo>
                </div>
              </div>
              <div className='relative pt-2 overflow-hidden before:content-[""] before:absolute before:right-0 before:top-0 before:h-full before:w-20 transparentToWhite'>
                {el.comment}
              </div>

              <div className='flex items-center justify-between w-full pt-2 '>
                <div>Reports: {el.reporters.length}</div>
                <ReportersList reporters={el.reporters} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No Reports </div>
      )}
    </>
  );
}
