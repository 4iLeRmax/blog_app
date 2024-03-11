'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import MoreInfo from './MoreInfo';
import { MdOutlineContentCopy } from 'react-icons/md';
import StatusModal from './Modals/StatusModal';

type ReportersListProps = {
  reporters: {
    name: string;
    email: string;
  }[];
};

export default function ReportersList({ reporters }: ReportersListProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const modalDuration = 3000;

  useEffect(() => {
    if (copied) {
      const time = setTimeout(() => {
        setCopied(false);
      }, modalDuration + 500);
      return () => clearTimeout(time);
    }
  }, [copied]);

  const copyFullURL = (username: string) => {
    navigator.clipboard.writeText(username);
    setCopied(true);
  };

  return (
    <>
      <AnimatePresence>
        {copied ? (
          <StatusModal modalDuration={modalDuration} status='success'>
            User email was copied successfully
          </StatusModal>
        ) : null}
      </AnimatePresence>
      <div>
        <button onClick={() => setModalIsOpen((p) => !p)}>
          {modalIsOpen ? 'Hide' : 'View'} reporters
        </button>
        <AnimatePresence>
          {modalIsOpen ? (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              className='absolute left-0 z-20 w-full overflow-y-scroll bg-white shadow-xl top-full rounded-xl h-[120px] flex flex-col'
            >
              {reporters.map((el) => (
                <div
                  key={el.email}
                  className='relative w-full px-5 py-[5px] transition-colors border-t-2'
                >
                  <div className=''>{el.name}</div>
                  <div>{el.email}</div>
                  <div className='absolute z-10 top-[14px] right-2'>
                    <MoreInfo>
                      <motion.div
                        initial={{ x: 40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 40, opacity: 0 }}
                        className='absolute top-0 -z-10 right-10'
                      >
                        <div className='flex flex-col w-40 bg-white rounded-md shadow-xl'>
                          <button
                            className='flex items-center gap-1 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-200'
                            onClick={() => copyFullURL(el.name)}
                          >
                            <MdOutlineContentCopy />
                            Copy username
                          </button>
                        </div>
                      </motion.div>
                    </MoreInfo>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
}
