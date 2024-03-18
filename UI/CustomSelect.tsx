import React, { useState } from 'react';

type CustomSelectProps = {
  options: string[];
  onChange: any;
  value: string;
};

const CustomSelect = ({ options, onChange, value }: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  return (
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
            {value}
            <svg
              className='w-5 h-5 ml-2 -mr-1'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'
            >
              <path
                fill-rule='evenodd'
                d='M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                clip-rule='evenodd'
              />
            </svg>
          </button>
        </span>
      </div>
      {isOpen && (
        <div
          className='absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
          role='menu'
          aria-orientation='vertical'
          aria-labelledby='options-menu'
        >
          <div className='py-1' role='none'>
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className='block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                role='menuitem'
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default CustomSelect;
