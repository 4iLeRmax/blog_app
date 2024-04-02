'use client';

import React, { useEffect, useRef, useState } from 'react';
import SearchInput from './SearchInput';
import SearchModal from './SearchModal';
import { useRouter, useSearchParams } from 'next/navigation';
import { TPost } from '@/types';

type SearchProps = {
  posts: TPost[] | undefined;
};

export default function Search({ posts }: SearchProps) {
  const [filteredPosts, setFilteredPosts] = useState<TPost[]>([]);
  const [selectedPost, setSelectedPost] = useState(0);

  const router = useRouter();
  const searchParams = useSearchParams();
  const params = searchParams.get('search') || '';

  useEffect(() => {
    // console.log('upd');
    if (posts !== undefined) {
      setFilteredPosts(
        posts.filter((post) => post.title.toLowerCase().includes(params.toLowerCase())),
      );
      setSelectedPost(0);
    }
  }, [params]);

  const handlePress: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    // console.log(filteredPosts.length);
    // console.log(e.key);
    // console.log(params);

    if (e.key === 'ArrowUp') {
      setSelectedPost((p) => (p === 0 ? filteredPosts.length - 1 : p - 1));
    } else if (e.key === 'ArrowDown') {
      setSelectedPost((p) => (p === filteredPosts.length - 1 ? 0 : p + 1));
    }
    // console.log(e.key);
    if (e.key === 'Enter') {
      const link = `/posts/${filteredPosts[selectedPost].id}`;

      // console.log(link);
      router.push(link);
    }
  };

  return (
    <>
      <div className='relative w-full sm:w-[50vw] md:w-full' onKeyDown={handlePress}>
        <SearchInput />
        <SearchModal filteredPosts={filteredPosts} selectedPost={selectedPost} />
      </div>
    </>
  );
}
