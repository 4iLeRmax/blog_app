'use client';

import React, { useEffect, useRef, useState } from 'react';
import SearchInput from './SearchInput';
import SearchModal from './SearchModal';
import { useRouter, useSearchParams } from 'next/navigation';

type SearchProps = {
  posts: Post[];
};

export default function Search({ posts }: SearchProps) {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState(0);

  const router = useRouter();
  const searchParams = useSearchParams();
  const params = searchParams.get('search') || '';

  useEffect(() => {
    // console.log('upd');
    setFilteredPosts(
      posts.filter((post) => post.title.toLowerCase().includes(params.toLowerCase())),
    );
    setSelectedPost(0);
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
      <div className='relative' onKeyDown={handlePress}>
        <SearchInput />
        <SearchModal filteredPosts={filteredPosts} selectedPost={selectedPost} />
      </div>
    </>
  );
}
