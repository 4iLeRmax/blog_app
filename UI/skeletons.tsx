'use client';

import clsx from 'clsx';

export const HeaderSkeleton = () => {
  return (
    <>
      <div className='headerSkeletonWrapper'>
        <div className='headerSkeleton'>
          <div className='headerSkeletonLinks'>
            <div className='headerSkeletonLink' />
            <div className='headerSkeletonLink' />
            <div className='headerSkeletonLink' />
          </div>

          <div className='headerSkeletonAdds'>
            <div className='headerSkeletonThemeSwitcher' />
            <div className='headerSkeletonSearch' />
            <div className='headerSkeletonAvatar' />
          </div>
        </div>
      </div>
    </>
  );
};

export const PostItemSkeleton = () => {
  return (
    <>
      <div className='postSkeleton'>
        <div className='postSkeletonImg'></div>

        <div className='postSkeletonTitle'></div>

        <div className='postSkeletonAdds'>
          <div className='flex items-center gap-3'>
            <div className='postSkeletonAddInfo'></div>
            <div className='postSkeletonAddInfo'></div>
          </div>
          <div className='postSkeletonAddInfo'></div>
        </div>
      </div>
    </>
  );
};

export const PostsListSkeleton = () => {
  return (
    <>
      <div className='postsSkeletonTitle'></div>
      <div className='postsSkeletonList'>
        {[...Array(9)].map((_, i) => (
          <PostItemSkeleton key={i} />
        ))}
      </div>
    </>
  );
};

import React from 'react';

// export const PostSkeleton = () => {
//   const MIN = 1;
//   const MAX = 10;
//   const randomNum = Math.floor(Math.random() * (MAX - MIN + 1) + MIN);
//   return (
//     <>
//       <div className='postSkelton'>
//         <div className='postSkeltonImg'></div>
//         <div className='postSkeletonTitle'></div>
//         <div className='postSkeletonText'>
//           {[...Array(randomNum)].map((_, i) => (
//             <div key={i} className='postSkeletonTextRow'></div>
//           ))}
//         </div>
//         <div className='postSkeletonDate'>
//           <div className='postSkeletonDateNum'></div>
//         </div>
//       </div>
//     </>
//   );
// };
// export const PostCommentsSkeleton = () => {
//   return (
//     <>
//       <div></div>
//     </>
//   );
// };

// export const PostLayoutSkeleton = () => {
//   return (
//     <>
//       <div className='flex flex-col items-center w-full gap-5 bg-gray-100 md:flex-row sm:gap-2 lg:gap-5'>
//         <PostSkeleton />

//         <div className='w-full md:w-auto'>
//           <div className='flex md:w-[320px] xl:w-[400px] w-full p-3 bg-gray-100 rounded-3xl'>
//             <PostCommentsSkeleton />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
