// const shimmer =
//   'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

import clsx from 'clsx';

export const PostSkeleton = () => {
  return (
    <>
      <div className='w-full bg-gray-100 rounded-xl'>
        <div className='w-full bg-gray-200 h-60 rounded-xl'></div>
        <div className='w-3/4 h-8 mx-3 mt-2 bg-gray-200 rounded-xl'></div>
        <div className='flex items-center justify-between w-full p-3'>
          <div className='w-10 h-6 bg-gray-200 rounded-xl'></div>
          <div className='w-20 h-6 bg-gray-200 rounded-xl'></div>
        </div>
      </div>
    </>
  );
};

export const PostsListSkeleton = () => {
  return (
    <div className='grid grid-cols-3 gap-5'>
      {[...Array(9)].map((_, i) => (
        <PostSkeleton key={i} />
      ))}
    </div>
  );
};

export const HeaderSkeleton = () => {
  return (
    <>
      <div
        className={clsx('fixed z-20 top-0 left-0 w-full py-3 px-[3%]', 'sm:px-[5%]', 'lg:px-[15%]')}
      >
        <div className='flex items-center justify-between w-full gap-5 px-8 py-3 bg-gray-100 rounded-xl'>
          <div className='flex items-center gap-3'>
            <div className='w-12 h-6 bg-gray-200 rounded-md'></div>
            <div className='w-12 h-6 bg-gray-200 rounded-md'></div>
          </div>

          <div className='flex items-center justify-center gap-3 '>
            <div className='w-[25vw] h-8 rounded-xl bg-gray-200'></div>
            <div className='w-20 h-8 bg-gray-200 rounded-xl'></div>
          </div>
        </div>
      </div>
    </>
  );
};
