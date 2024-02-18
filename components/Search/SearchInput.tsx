// 'use client';

// import clsx from 'clsx';
// import { AnimatePresence, motion } from 'framer-motion';
// import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// import React, { useEffect, useState } from 'react';
// import { IoClose, IoSearch } from 'react-icons/io5';

// export default function SearchInput() {
//   const searchParams = useSearchParams();
//   const pathname = usePathname();
//   const router = useRouter();
//   const [inputValue, setInputValue] = useState(searchParams?.get('search') || '');

//   const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
//     const val = e.target.value;
//     setInputValue(val);
//     const params = new URLSearchParams(searchParams);

//     if (val) {
//       params.set('search', val);
//     } else {
//       params.delete('search');
//     }

//     router.push(pathname + '?' + params);
//   };

//   const clearSearch = () => {
//     const params = new URLSearchParams(searchParams);
//     params.delete('search');
//     setInputValue('');
//     router.push(pathname + '?' + params);
//   };

//   return (
//     <>
//       <div className='relative flex items-center'>
//         <div className='absolute top-0 left-0 flex items-center justify-center w-10 h-8'>
//           <IoSearch size={25} />
//         </div>
//         <input
//           type='text'
//           className={clsx(
//             'w-[25vw] py-1 text-black outline-none rounded-xl px-10 bg-blue-100/60 transition-all duration-300',
//             {
//               'rounded-es-none rounded-ee-none w-[30vw] bg-white': inputValue.length > 0,
//             },
//           )}
//           value={inputValue}
//           onChange={(e) => handleChange(e)}
//           placeholder='Search...'
//         />
//         <AnimatePresence>
//           {searchParams?.get('search') ? (
//             <motion.button
//               initial={{ scale: 0, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0, opacity: 0 }}
//               onClick={clearSearch}
//               className='absolute top-0 right-0 flex items-center justify-center w-10 h-8'
//             >
//               <IoClose size={25} />
//             </motion.button>
//           ) : null}
//         </AnimatePresence>
//       </div>
//     </>
//   );
// }
'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
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

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const val = e.target.value;

    if (val) {
      params.set('search', val);
    } else {
      params.delete('search');
    }

    router.push(pathname + '?' + params);
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
        <div className='absolute top-0 left-0 flex items-center justify-center w-10 h-8'>
          <IoSearch size={25} />
        </div>
        <input
          ref={inputRef}
          type='text'
          // className={clsx(
          //   'w-[25vw] py-1 text-black outline-none rounded-xl px-10 bg-blue-100/60 transition-all duration-300',
          //   {
          //     'rounded-es-none rounded-ee-none w-[30vw] bg-white':
          //       (searchParams?.get('search') || '').length > 0,
          //   },
          // )}
          className={clsx(
            'w-full py-1 text-black outline-none rounded-xl px-10 bg-blue-100/60 transition-all duration-300',
            {
              'rounded-es-none rounded-ee-none bg-white ':
                (searchParams?.get('search') || '').length > 0,
            },
          )}
          defaultValue={searchParams?.get('search') || ''}
          onChange={(e) => handleChange(e)}
          placeholder='Search...'
        />
        <AnimatePresence>
          {searchParams?.get('search') ? (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={clearSearch}
              className='absolute top-0 right-0 flex items-center justify-center w-10 h-8'
            >
              <IoClose size={25} />
            </motion.button>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
}
