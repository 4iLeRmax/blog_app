// import { authOptions } from '@/app/api/auth/[...nextauth]/options';
// import BreadCrumbs from '@/components/BreadCrumbs';
// import Comments from '@/components/Comments/Comments';
// import ConfirmActionModal from '@/components/Modals/ConfirmActionModal';
// import StatusModal from '@/components/Modals/StatusModal';
// import PostMoreInfo from '@/components/PostMoreInfo';
// import { getPost } from '@/lib/getPost';
// import { getServerSession } from 'next-auth';
// import Image from 'next/image';
// import { IoMdMore } from 'react-icons/io';

// type Params = {
//   params: {
//     id: string;
//   };
// };

// export default async function PostPage({ params: { id } }: Params) {
//   const post: Post = await getPost(id);
//   const session = await getServerSession(authOptions);

//   const isAdmin = session?.user
//     ? (session?.user as SessionUser).role === 'admin'
//       ? true
//       : false
//     : false;

//   const breadcrumbsLinks: BrcsLinks = [
//     {
//       link: '/',
//       value: 'Home',
//     },
//     {
//       link: '/posts',
//       value: 'Posts',
//     },
//     {
//       link: `/posts/${id}`,
//       value: post.title,
//     },
//   ];

//   return (
//     <>
//       <div>
//         <BreadCrumbs links={breadcrumbsLinks} />
//         <div className='flex items-start w-full gap-5'>
//           <div className='relative w-full p-3 glassEffect'>
//             <PostMoreInfo isAdmin={isAdmin} postId={id} />
//             {post.image ? (
//               <div className='relative w-full overflow-hidden h-80 rounded-xl'>
//                 <Image src={post.image} alt='' fill className='object-cover' />
//               </div>
//             ) : null}
//             <div>
//               <h1>{post.title}</h1>
//               <p>{post.body}</p>
//               <div className='flex justify-end pt-5'>{post.date}</div>
//             </div>
//           </div>

//           <div>
//             <div className='p-3 glassEffect w-[380px]'>
//               <Comments post={post} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import Post from '@/components/Post';
import PostMoreInfo from '@/components/PostMoreInfo';
import { getPost } from '@/lib/getPost';
import { getServerSession } from 'next-auth';
import Image from 'next/image';

type Params = {
  params: {
    id: string;
  };
};

export default async function PostPage({ params: { id } }: Params) {
  const post: Post = await getPost(id);
  const session = await getServerSession(authOptions);

  const isAdmin = session?.user
    ? (session?.user as SessionUser).role === 'admin'
      ? true
      : false
    : false;

  return (
    <>
      <Post postId={id} isAdmin={isAdmin} post={post} />
    </>
  );
}
