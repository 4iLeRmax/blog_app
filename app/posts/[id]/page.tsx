import Post from '@/components/Post';
import { getPost } from '@/lib/getPost';
import { getPosts } from '@/lib/getPosts';
import { TPost } from '@/types';

type Params = {
  params: {
    id: string;
  };
};

export default async function PostPage({ params: { id } }: Params) {
  const post = await getPost(id);
  return <>{post ? <Post post={post} /> : null}</>;
}

export const generateStaticParams = async () => {
  const posts = (await getPosts()) as TPost[];

  return posts.map((post) => ({
    id: post.id,
  }));
};
