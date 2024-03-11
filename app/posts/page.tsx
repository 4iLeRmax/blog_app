import { PostsListSkeleton } from '@/UI/skeletons';
import BreadCrumbs from '@/components/BreadCrumbs';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const PostsList = dynamic(() => import('@/components/PostsList'), {
  loading: () => <PostsListSkeleton />,
});

export const metadata: Metadata = {
  title: 'All Posts',
};

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
  return (
    <>
      <div>
        <BreadCrumbs links={breadcrumbsLinks} />
        <PostsList />
      </div>
    </>
  );
}
