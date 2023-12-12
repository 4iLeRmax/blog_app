import Image from 'next/image';
import Link from 'next/link';
import { MdOutlineInsertComment } from 'react-icons/md';

type PostItemProps = {
  post: Post;
};

export default function PostItem({ post }: PostItemProps) {
  return (
    <>
      {post ? (
        <Link href={`/posts/${post.id}`} className='border-0 glassEffect rounded-xl'>
          {post.image ? (
            <div className='relative w-full overflow-hidden h-60 rounded-xl'>
              <Image src={post.image} alt='' fill className={'object-cover'} />
            </div>
          ) : (
            <div className='flex items-center justify-center overflow-hidden text-3xl bg-blue-100 w-ful h-60 rounded-xl text-black/40'>
              ?
            </div>
          )}
          <h1 className='px-3 pt-2 text-2xl'>{post.title}</h1>

          <div className='flex items-center justify-between p-3'>
            <div className='flex items-center gap-1'>
              <MdOutlineInsertComment size={20} /> <span>{post.comments?.length}</span>
            </div>
            <div>{post.date}</div>
          </div>
        </Link>
      ) : null}
    </>
  );
}
