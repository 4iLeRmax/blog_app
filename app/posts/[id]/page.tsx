import Post from '@/components/Post';
import { getPosts } from '@/lib/getPosts';
import { TPost } from '@/types';

type Params = {
  params: {
    id: string;
  };
};

export default function PostPage({ params: { id } }: Params) {
  return (
    <div className='flex flex-col gap-5'>
      <Post postId={id} />
    </div>
  );
}

export const generateStaticParams = async () => {
  const posts = (await getPosts()) as TPost[];

  return posts.map((post) => ({
    id: post.id,
  }));
};
