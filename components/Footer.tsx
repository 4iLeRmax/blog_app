import React from 'react';

import { FaPhoneAlt } from 'react-icons/fa';
import { FaLocationDot, FaXTwitter, FaFacebookF, FaInstagram, FaGithub } from 'react-icons/fa6';

import Wrapper from '@/layouts/wrapper';
import { IoMail } from 'react-icons/io5';

export default function Footer() {
  return (
    <>
      <Wrapper>
        <div style={{ marginTop: 64 }} className='px-5 py-10 glassEffect '>
          <div className='flex flex-col-reverse items-start justify-between gap-5 sm:flex-row'>
            <div className='flex gap-5 sm:gap-2 sm:flex-col'>
              <div className='flex items-center gap-2'>
                <div className='flex items-center justify-center w-8 h-8 bg-white rounded-full'>
                  <FaLocationDot size={20} />
                </div>
                Location
              </div>
              <div className='flex items-center gap-2'>
                <div className='flex items-center justify-center w-8 h-8 bg-white rounded-full'>
                  <FaPhoneAlt size={20} />
                </div>
                Phone
              </div>
              <div className='flex items-center gap-2'>
                <div className='flex items-center justify-center w-8 h-8 bg-white rounded-full'>
                  <IoMail size={20} />
                </div>
                Mail
              </div>
            </div>
            <div className='w-full sm:w-2/4'>
              <div>
                <h1 className='text-xl font-semibold'>About us</h1>
                <p className='pt-2'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem quam
                  beatae illo blanditiis. Quisquam debitis dolores sint expedita consequatur illum,
                  iusto corrupti iure. Est a, eveniet perferendis quis incidunt mollitia.
                </p>
              </div>
              <div className='flex items-center gap-2 mt-5'>
                <div className='flex items-center justify-center w-10 h-10 bg-white rounded-md'>
                  <FaFacebookF size={30} />
                </div>
                <div className='flex items-center justify-center w-10 h-10 bg-white rounded-md'>
                  <FaXTwitter size={30} />
                </div>
                <div className='flex items-center justify-center w-10 h-10 bg-white rounded-md'>
                  <FaInstagram size={30} />
                </div>
                <div className='flex items-center justify-center w-10 h-10 bg-white rounded-md'>
                  <FaGithub size={30} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
}
