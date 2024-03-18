'use client';

import clsx from 'clsx';
import React, { useState } from 'react';

type TabsComponentProps = {
  tabs: { title: string; content: React.ReactNode }[];
};

export default function TabsComponent({ tabs }: TabsComponentProps) {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <>
      <div>
        <div className='grid grid-cols-1 gap-1 px-5 py-2 md:gap-3 sm:grid-cols-2 glassEffect lg:grid-cols-4'>
          {tabs.map((tab, i) => (
            <button
              key={tab.title}
              className={clsx('py-2 rounded-md text-semibold border-blue-500 border-2', {
                'bg-transparent text-blue-500 hover:bg-blue-500 hover:text-white':
                  selectedTab === i,
                'bg-blue-500 text-white hover:bg-transparent   hover:text-blue-500':
                  selectedTab !== i,
              })}
              onClick={() => setSelectedTab(i)}
            >
              {tab.title}
            </button>
          ))}
        </div>
        <div className='mt-8'>{tabs[selectedTab].content}</div>
      </div>
    </>
  );
}
