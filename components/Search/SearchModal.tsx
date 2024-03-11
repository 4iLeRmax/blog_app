// 'use client';

// import clsx from 'clsx';
// import Link from 'next/link';
// import { useRouter, useSearchParams } from 'next/navigation';
// import React, { useState, useEffect } from 'react';

// type SearchModalProps = {
//   posts: Post[];
//   SearchRef: React.MutableRefObject<any>;
// };

// export default function SearchModal({ posts, SearchRef }: SearchModalProps) {
//   const [selectedPost, setSelectedPost] = useState(0);
//   const [filteredPosts, setFilteredPosts] = useState(posts);
//   const searchParams = useSearchParams();
//   const params = searchParams.get('search') || '';
//   const router = useRouter();

//   useEffect(() => {
//     console.log('upd');

//     setFilteredPosts(
//       posts.filter((post) => post.title.toLowerCase().includes(params.toLowerCase())),
//     );
//     setSelectedPost(0);
//   }, [params]);

//   const handlePress = (e: React.KeyboardEvent) => {
//     console.log(filteredPosts.length);

//     if (e.key === 'ArrowUp') {
//       setSelectedPost((p) => (p === 0 ? filteredPosts.length - 1 : p - 1));
//     } else if (e.key === 'ArrowDown') {
//       setSelectedPost((p) => (p === filteredPosts.length - 1 ? 0 : p + 1));
//     }
//     // console.log(e.key);
//     if (e.key === 'Enter') {
//       const link = `/posts/${posts[selectedPost].id}`;

//       console.log(link);
//       router.push(link);
//     }
//   };

//   useEffect(() => {
//     if (SearchRef && SearchRef.current) {
//       SearchRef.current.addEventListener('keydown', handlePress);
//       return () => SearchRef.current.removeEventListener('keydown', handlePress);
//     }
//   }, []);

//   // console.log(filteredPosts.length);

//   return (
//     <>
//       {params.length > 0 ? (
//         <div className='absolute left-0 z-20 flex flex-col w-full py-3 bg-white shadow-md top-8 rounded-es-xl rounded-ee-xl text-black/40'>
//           {filteredPosts.length > 0 ? (
//             filteredPosts.map((post, i) => (
//               <Link
//                 href={`/posts/${post.id}`}
//                 key={post.id}
//                 className={clsx(
//                   'relative ',
//                   'before:content-[""] before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:rounded-se-md before:rounded-ee-md py-1',

//                   {
//                     'bg-gray-100 before:bg-blue-500': i === selectedPost,
//                   },
//                 )}
//               >
//                 <div className='flex items-center justify-between px-5'>
//                   <h1>{post.title}</h1>
//                   <div>{post.date}</div>
//                 </div>
//               </Link>
//             ))
//           ) : (
//             <div className='flex items-center justify-center'>No Results</div>
//           )}
//         </div>
//       ) : null}
//     </>
//   );
// }
'use client';

import { formatTimeAgo } from '@/lib/formatTimeAgo';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

type SearchModalProps = {
  filteredPosts: Post[];
  selectedPost: number;
};

export default function SearchModal({ filteredPosts, selectedPost }: SearchModalProps) {
  const searchParams = useSearchParams();
  const params = searchParams.get('search') || '';

  // console.log({ params });
  // console.log({ filteredPosts: filteredPosts.length });
  // console.log({ selectedPost });
  // console.log('====================================================================');

  return (
    <>
      {params.length > 0 ? (
        <div className='absolute left-0 z-20 flex flex-col w-full py-3 bg-white shadow-md top-8 rounded-es-xl rounded-ee-xl text-black/40'>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, i) => (
              <Link
                href={`/posts/${post.id}`}
                key={post.id}
                className={clsx(
                  'relative flex items-center justify-between px-5',
                  'before:content-[""] before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:rounded-se-md before:rounded-ee-md py-1',
                  'hover:bg-gray-100',
                  {
                    'bg-gray-100 before:bg-blue-500': i === selectedPost,
                  },
                )}
              >
                <h1>{post.title}</h1>
                <div>{formatTimeAgo(post.date)}</div>
              </Link>
            ))
          ) : (
            <div className='flex items-center justify-center'>No Results</div>
          )}
        </div>
      ) : null}
    </>
  );
}
