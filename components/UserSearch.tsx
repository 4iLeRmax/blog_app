'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { IoClose, IoSearch } from 'react-icons/io5';

type UserSearchProps = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

export default function UserSearch({ searchValue, setSearchValue }: UserSearchProps) {
  return (
    // <div className='relative w-2/3 text-black/40'>
    <div className='relative w-full md:w-2/3 text-black/40'>
      <div className='absolute top-0 left-0 flex items-center justify-center w-10 h-8'>
        <IoSearch size={25} />
      </div>
      <input
        type='text'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder='Find user ...'
        className='w-full px-10 py-1 outline-none rounded-xl'
      />
      <AnimatePresence>
        {searchValue.length > 0 ? (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchValue('')}
            className='absolute top-0 right-0 flex items-center justify-center w-10 h-8'
          >
            <IoClose size={25} />
          </motion.button>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
