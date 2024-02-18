import { PostsListSkeleton } from '@/UI/seletons';
import BreadCrumbs from '@/components/BreadCrumbs';
import { getPosts } from '@/lib/getPosts';
import dynamic from 'next/dynamic';

const PostsList = dynamic(() => import('@/components/PostsList'), {
  loading: () => <PostsListSkeleton />,
});

const breadcrumbsLinks: BrcsLinks = [
  {
    link: '/',
    value: 'Home',
  },
  {
    link: '/posts',
    value: 'Posts',
  },
];

export default async function PostsPage() {
  const posts = await getPosts();
  const bla = (str: string) =>
    new Date([str.split('.')[2], str.split('.')[1], str.split('.')[0]].join('-')).getTime();

  console.log(
    posts.map((post) => ({
      ...post,
      comments: post.comments.map((comment) => ({ ...comment, date: bla(comment.date) })),
    }))[0].comments,
  );

  return (
    <>
      <div>
        <BreadCrumbs links={breadcrumbsLinks} />
        <div>
          <h1 className='text-2xl font-semibold'>All posts ({posts.length}) </h1>
          <PostsList />
        </div>
      </div>
    </>
  );
}
