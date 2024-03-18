'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';

type SocialMediaListProps = {
  socialMedia: {
    label: string;
    link: string;
  }[];
  setSocialMedia: React.Dispatch<
    React.SetStateAction<
      {
        label: string;
        link: string;
      }[]
    >
  >;
  tempLink: string;
  setTempLink: React.Dispatch<React.SetStateAction<string>>;
  socialMediaColors: any;
};

export default function SocialMediaList({
  socialMedia,
  setSocialMedia,
  tempLink,
  setTempLink,
  socialMediaColors,
}: SocialMediaListProps) {
  const [isError, setIsError] = useState(false);

  const addSocialMediaLink = (label: string) => {
    if (tempLink !== '') {
      const urlRegex = /(?:https?|ftp):\/\/[^\s/$.?#].[^\s]*|www\.[^\s/$.?#].[^\s]*/gi;
      if (urlRegex.test(tempLink)) {
        setSocialMedia((p) => [
          ...p.map((sm) => (sm.label === label ? { label, link: tempLink } : sm)),
        ]);
        setTempLink('');
      } else {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 5000);
      }
    }
  };
  const removeLink = (label: string) => {
    setSocialMedia((p) => [...p.filter((link) => link.label !== label)]);
  };

  return (
    <>
      <div className='flex flex-wrap items-center gap-2 mt-5'>
        {socialMedia.length > 0
          ? socialMedia.map((el, i) =>
              el.link !== '' ? (
                <div
                  title={el.link}
                  key={i}
                  className='flex items-center gap-2 px-2 py-1 text-white rounded-xl'
                  style={{
                    color: socialMediaColors[el.label].text as string,
                    background: socialMediaColors[el.label].bg as string,
                  }}
                >
                  <Link href={el.link} target='_blank'>
                    {el.label}
                  </Link>
                  <button type='button' onClick={() => removeLink(el.label)}>
                    <IoClose />
                  </button>
                </div>
              ) : (
                <div className='flex items-center sm:w-[380px] w-full relative'>
                  <input
                    className='w-3/5 px-5 py-1 outline-none sm:w-auto rounded-ss-xl rounded-es-xl'
                    type='text'
                    placeholder={`${el.label} link account ...`}
                    value={tempLink}
                    onChange={(e) => setTempLink(e.target.value)}
                  />
                  <button
                    className='flex items-center justify-center w-2/5 sm:w-[120px] h-8 text-white transition-colors bg-blue-500  rounded-se-xl rounded-ee-xl hover:bg-blue-400'
                    onClick={() => addSocialMediaLink(el.label)}
                  >
                    Save Link
                  </button>
                  <AnimatePresence>
                    {isError ? (
                      <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 100, opacity: 0 }}
                        className='absolute left-0 text-red-500 text-semibold top-full'
                      >
                        Incorrect url ! Try https://example.com
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              ),
            )
          : null}
      </div>
    </>
  );
}
