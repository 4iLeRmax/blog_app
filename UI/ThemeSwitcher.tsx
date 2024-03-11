'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('theme')) {
      if (localStorage.getItem('theme') === 'dark') {
        setIsDark(true);
        document.body.classList.add('dark');
      } else {
        setIsDark(false);
        document.body.classList.add('light');
      }
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
      document.body.classList.add('dark');
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
    // if (isDark) {
    //   document.body.classList.add('light');
    // } else  {
    //   document.body.classList.add('dark');
    // }
    document.body.classList.toggle('dark', isDark);
    document.body.classList.toggle('light', !isDark);
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
            style={{ width: 20, height: 20 }}
            className='absolute rounded-full top-0.5'
            animate={
              isDark ? { x: 26, y: 2, background: '#4e4e4e' } : { x: 4, y: 2, background: '#fff' }
            }
          ></motion.div>
        </motion.div>
      </div>
    </>
  );
}
