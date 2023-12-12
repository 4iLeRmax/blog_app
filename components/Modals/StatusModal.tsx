'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

type StatusModalProps = {
  children: React.ReactNode;
  status: Status;
  modalDelay: number;
};

export default function StatusModal({ children, status, modalDelay }: StatusModalProps) {
  return (
    <>
      <motion.div
        initial={{ y: 200 }}
        animate={{ y: 0 }}
        exit={{ y: 200 }}
        className={clsx('fixed z-40 bottom-0 right-0 pt-3 px-3 pb-1 rounded-ss-xl rounded-se-xl w-80', {
          'bg-[#669822]': status === 'success',
          'bg-[#f0b9ae]': status === 'error',
          'bg-[#facf74]': status === 'warning',
        })}
      >
        <h1 className='pb-1 text-white'>{children}</h1>
        <CountdownLine time={modalDelay} status={status} />
      </motion.div>
    </>
  );
}

const CountdownLine = ({ time, status }: { time: number; status: Status }) => {
  const [percentage, setPercentage] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prevPercentage) => Math.max(prevPercentage - 100 / (time / 100), 0));
    }, 100);

    return () => clearInterval(interval);
  }, [time]);

  return (
    <div className='w-full h-2 overflow-hidden bg-gray-200'>
      <div
        className={clsx('h-2 transition-all ', {
          'bg-[#334c11]': status === 'success',
          'bg-[#690003]': status === 'error',
          'bg-[#FDB10B]': status === 'warning',
        })}
        style={{
          width: `${percentage}%`,
        }}
      ></div>
    </div>
  );
};
