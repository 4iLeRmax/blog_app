'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('theme'))
      localStorage.getItem('theme') === 'dark' ? setIsDark(true) : setIsDark(false);
    else {
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    }
  }, []);

  const changeTheme = () => {
    setIsDark((p) => {
      !p ? localStorage.setItem('theme', 'dark') : localStorage.setItem('theme', 'light');
      return !p;
    });
  };

  // useEffect(())

  useEffect(() => {
    document.body.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <>
      <div style={{ width: 50 }} key={'switcher'} className='cursor-pointer'>
        <motion.div
          onClick={changeTheme}
          className='relative w-full h-6 overflow-hidden rounded-xl'
          animate={isDark ? { background: '#9a9a9a' } : { background: '#dbeafe' }}
        >
          <motion.div
            className={clsx('absolute w-5 h-5 rounded-full')}
            // initial={{ x: 2, y: 2 }}
            animate={
              isDark ? { x: 26, y: 2, background: '#4e4e4e' } : { x: 4, y: 2, background: '#fff' }
            }
          ></motion.div>
        </motion.div>
      </div>
    </>
  );
}
