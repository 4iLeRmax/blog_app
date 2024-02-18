import Post from '@/components/Post';
import { getPost } from '@/lib/getPost';
import { getPosts } from '@/lib/getPosts';
import { userIsAdmin } from '@/lib/userIsAdmin';

type Params = {
  params: {
    id: string;
  };
};

export default async function PostPage({ params: { id } }: Params) {
  const post: Post = await getPost(id);

  const isAdmin = await userIsAdmin();

  return (
    <>
      <Post postId={id} isAdmin={isAdmin} post={post} />
    </>
  );
}

export const generateStaticParams = async () => {
  const posts = await getPosts();

  return posts.map((post) => ({
    id: post.id,
  }));
};
