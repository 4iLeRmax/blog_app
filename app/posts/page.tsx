import { PostsListSkeleton } from '@/UI/seletons';
import BreadCrumbs from '@/components/BreadCrumbs';
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

export default function PostsPage() {
  // const session = await getServerSession(authOptions);

  return (
    <>
      <div>
        <BreadCrumbs links={breadcrumbsLinks} />
        <div>
          <h1>Posts</h1>
          <PostsList />
        </div>
      </div>
    </>
  );
}
