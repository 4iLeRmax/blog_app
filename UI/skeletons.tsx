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

export const DashboardSkeleton = () => {
  return (
    <>
      <div>
        <div className='dashboardSkeletonBreadCrumbs'>
          <div className='dashboardSkeletonCrumb'></div>
          <div className='dashboardSkeletonCrumb'></div>
        </div>
        <div className='dashboardSkeletonButtons'>
          <div className='dashboardSkeletonButton'></div>
          <div className='dashboardSkeletonButton'></div>
          <div className='dashboardSkeletonButton'></div>
          <div className='dashboardSkeletonButton'></div>
        </div>
        <div className='dashboardSkeletonEditor'>
          <div className='dashboardSkeletonLoader'></div>
        </div>
      </div>
    </>
  );
};

// export const ImageUploaderSkeleton = () => {
//   return (
//     <>
//       <div className='imageUploaderSkeleton-wrapper'>
//         <div className='imageUploaderSkeleton-image'>?</div>
//         <div className='imageUploaderSkeleton-info'>
//           <div className='imageUploaderSkeleton-button'></div>
//           <div className='imageUploaderSkeleton-title'></div>
//         </div>
//       </div>
//     </>
//   );
// };
