import { updateContactInfo } from '@/lib/actions';
import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { IoMail } from 'react-icons/io5';

type ContactInfoFormProps = {
  contactInfo: ContactInfo;
};

export default function ContactInfoForm({ contactInfo }: ContactInfoFormProps) {
  return (
    <>
      <form action={updateContactInfo}>
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3'>
          <div className='flex items-center gap-2 border-b-2 border-blue-500'>
            <div>
              <div className='flex items-center justify-center w-8 h-8 rounded-full shadow-md bg-modal-bg text-primary-color'>
                <FaLocationDot size={20} />
              </div>
            </div>
            <input
              type='text'
              placeholder='Location...'
              name='location'
              defaultValue={contactInfo?.address || ''}
              className='w-full py-2 transition-transform bg-transparent outline-none text-primary-color'
            />
          </div>

          <div className='flex items-center gap-2 border-b-2 border-blue-500'>
            <div>
              <div className='flex items-center justify-center w-8 h-8 rounded-full shadow-md bg-modal-bg text-primary-color'>
                <FaPhoneAlt size={20} />
              </div>
            </div>
            <input
              type='text'
              placeholder='Phone number...'
              name='phone'
              defaultValue={contactInfo?.number || ''}
              className='w-full py-2 transition-transform bg-transparent outline-none text-primary-color'
            />
          </div>

          <div className='flex items-center w-full gap-2 border-b-2 border-blue-500'>
            <div>
              <div className='flex items-center justify-center w-8 h-8 rounded-full shadow-md bg-modal-bg text-primary-color'>
                <IoMail size={20} />
              </div>
            </div>
            <input
              type='email'
              placeholder='Email ...'
              name='contactMail'
              defaultValue={contactInfo?.contactMail || ''}
              className='w-full py-2 transition-transform bg-transparent outline-none text-primary-color'
            />
          </div>
        </div>
        <button className='flex items-center justify-center w-full h-8 mt-5 text-white bg-blue-500 rounded-xl'>
          Update Data
        </button>
      </form>
    </>
  );
}
