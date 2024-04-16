'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import { IoClose, IoSearch } from 'react-icons/io5';

export default function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!searchParams?.get('search') && inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.blur();
    }
  }, [pathname]);

  const debounce = <F extends (...args: any[]) => any>(
    func: F,
    delay: number,
  ): ((this: any, ...args: Parameters<F>) => void) => {
    let timeoutId: ReturnType<typeof setTimeout>;

    return function (this: any, ...args: Parameters<F>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const debouncedSetSearch = debounce((value) => {
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    router.push(pathname + '?' + params);
  }, 300); // Adjust debounce time as needed

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const val = e.target.value;
    debouncedSetSearch(val);
  };

  // const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
  //   const val = e.target.value;
  //   if (val) {
  //     params.set('search', val);
  //   } else {
  //     params.delete('search');
  //   }

  //   router.push(pathname + '?' + params);
  // };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
    }
  };

  const clearSearch = () => {
    params.delete('search');
    if (inputRef.current) inputRef.current.value = '';
    // setInputValue('');
    router.push(pathname + '?' + params);
  };

  return (
    <>
      <div className='relative flex items-center'>
        <div className='absolute top-0 left-0 flex items-center justify-center w-10 h-8 text-secondary-color'>
          <IoSearch size={25} />
        </div>
        <input
          ref={inputRef}
          type='text'
          className={clsx(
            'w-full py-1 outline-none rounded-xl px-10 bg-blue-100/60 transition-all duration-300 placeholder:text-[#282828aa] text-primary-color',
            {
              'rounded-es-none rounded-ee-none bg-modal-bg ':
                (searchParams?.get('search') || '').length > 0,
            },
          )}
          defaultValue={searchParams?.get('search') || ''}
          onChange={(e) => handleChange(e)}
          onKeyDown={handleKeyDown}
          placeholder='Search...'
        />
        <AnimatePresence>
          {searchParams?.get('search') ? (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={clearSearch}
              className='absolute top-0 right-0 flex items-center justify-center w-10 h-8 text-secondary-color'
            >
              <IoClose size={25} />
            </motion.button>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
}
