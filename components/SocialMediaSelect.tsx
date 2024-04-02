'use client';

import React, { useState } from 'react';

type SocialMediaSelectProps = {
  socialMedia: {
    label: string;
    link: string;
  }[];
  options: string[];
  setSocialMedia: React.Dispatch<
    React.SetStateAction<
      {
        label: string;
        link: string;
      }[]
    >
  >;
};

export default function SocialMediaSelect({
  socialMedia,
  options,
  setSocialMedia,
}: SocialMediaSelectProps) {
  const [selectedOption, setSelectedOption] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const addSocialMediaLabel = (selectedValue: string) => {
    setSelectedOption(selectedValue);
    setIsOpen(false);
    if (selectedValue !== '') {
      if (!socialMedia.some((el) => el.label === selectedValue)) {
        setSocialMedia((p) => [
          ...p.filter((el) => el.link !== ''),
          { label: selectedValue, link: '' },
        ]);
      }
    }
  };

  return (
    <>
      <div className='relative inline-block text-left'>
        <div>
          <span className='rounded-md shadow-sm' onClick={handleToggle}>
            <button
              type='button'
              className='inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300'
              id='options-menu'
              aria-haspopup='true'
              aria-expanded='true'
            >
              {selectedOption === '' ? 'Select the social media you want to add' : selectedOption}
              <svg
                className='w-5 h-5 ml-2 -mr-1'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </span>
        </div>
        {isOpen && (
          <div
            className='absolute right-0 z-20 w-full mt-2 origin-top-right bg-white rounded-md shadow-lg xs:w-56 ring-1 ring-black ring-opacity-5 focus:outline-none'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='options-menu'
          >
            <div className='' role='none'>
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => addSocialMediaLabel(option)}
                  disabled={socialMedia.some((sm) => sm.label === option)}
                  className='block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900 disabled:bg-gray-100 disabled:text-gray-400'
                  role='menuitem'
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
