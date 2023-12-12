'use client';

import { updatePost } from '@/lib/actions';
import Link from 'next/link';
import React, { useState } from 'react';

type UpdatePostFormProps = {
  post: Post;
};

export default function UpdatePostForm({ post }: UpdatePostFormProps) {
  // const [boldWords, setBoldWords] = useState<string[]>([]);
  const [selectedText, setSelectedText] = useState('');
  const [selectedStartEndIndex, setSelectedStartEndIndex] = useState<[number, number]>([0, 0]);
  const [updatedText, setUpdatedText] = useState(post.body);

  const selectText = () => {
    const sel = window?.getSelection() as Selection;
    const selStart = sel?.anchorOffset as number;
    const selEnd = sel?.focusOffset as number;

    if (sel.toString() !== '') {
      console.log(sel.toString());
      console.log(selStart);
      console.log(selEnd);

      setSelectedStartEndIndex([selStart, selEnd]);
      setSelectedText(sel.toString());
    }
  };

  const replaceWordWithBold = (text: string, startIndex: number, endIndex: number) => {
    const wordToReplace = text.slice(startIndex, endIndex);

    const replacement = `<b>${wordToReplace}</b>`;

    const newText = text.slice(0, startIndex) + replacement + text.slice(endIndex);

    setUpdatedText(newText);
  };

  return (
    <>
      <form action={updatePost.bind(null, post.id)}>
        <input
          defaultValue={post.title}
          name='title'
          className='w-full p-2 mt-1 mb-2 text-3xl bg-blue-100 resize-none h-14 rounded-xl '
        ></input>

        {/* <div className='flex items-center w-full p-1 bg-white rounded-xl'>
          <button
            className='flex items-center justify-center w-6 h-6 rounded-md'
            onClick={() =>
              replaceWordWithBold(post.body, selectedStartEndIndex[0], selectedStartEndIndex[1])
            }
          >
            B
          </button>
        </div> */}

        {/* <div className='w-full p-2 bg-blue-100 resize-none h-80 rounded-xl' onMouseUp={selectText}>
          {updatedText}
        </div> */}

        <textarea
          defaultValue={post.body}
          name='body'
          className='w-full p-2 bg-blue-100 resize-none h-80 rounded-xl '
        ></textarea>
        <div className='flex items-center justify-between w-full'>
          <button type='submit' className='px-5 py-2 text-white bg-blue-500 rounded-md'>
            Save changes
          </button>
          <Link href={`/posts/${post.id}`} className='px-5 py-2 text-white bg-blue-500 rounded-md'>
            Cancel
          </Link>
        </div>
        <div className='flex justify-end pt-5'>{post.date}</div>
      </form>
    </>
  );
}
