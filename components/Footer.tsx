import React from 'react';

import { FaPhoneAlt } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';

import Wrapper from '@/layouts/wrapper';
import { IoMail } from 'react-icons/io5';
import Link from 'next/link';
import { socialMediaColors, socialMediaLogos } from '@/data';
import { getContactInfo } from '@/lib/getContactInfo';

export default async function Footer() {
  const contactInfo = await getContactInfo();

  // console.log(contactInfo?.SocialMediaLinks);

  return (
    <>
      <Wrapper>
        <div style={{ marginTop: 64 }} className='px-5 py-10 glassEffect '>
          <div className='flex flex-col-reverse items-start justify-between gap-5 sm:flex-row'>
            <div className='flex flex-col justify-center w-full gap-5 sm:justify-start'>
              <div className='flex flex-col items-center gap-2 sm:flex-row'>
                <div className='flex items-center justify-center w-8 h-8 rounded-full shadow-md bg-modal-bg text-primary-color'>
                  <FaLocationDot size={20} />
                </div>
                {contactInfo?.address ? (
                  <div className='text-primary-color'>{contactInfo?.address}</div>
                ) : (
                  <div className='text-sm'>We'll have our address here soon ...</div>
                )}
              </div>

              <div className='flex flex-col items-center gap-2 sm:flex-row'>
                <div className='flex items-center justify-center w-8 h-8 rounded-full shadow-md bg-modal-bg text-primary-color'>
                  <FaPhoneAlt size={20} />
                </div>
                {contactInfo?.number ? (
                  <div className='text-primary-color'>{contactInfo.number}</div>
                ) : (
                  <div className='text-sm'>We'll have our phone number here soon ...</div>
                )}
              </div>

              <div className='flex flex-col items-center gap-2 sm:flex-row'>
                <div className='flex items-center justify-center w-8 h-8 rounded-full shadow-md bg-modal-bg text-primary-color'>
                  <IoMail size={20} />
                </div>
                {contactInfo?.contactMail ? (
                  <div className='text-primary-color'>{contactInfo.contactMail}</div>
                ) : (
                  <div className='text-sm'>We'll have our contact email here soon ...</div>
                )}
              </div>
            </div>
            <div className='w-full sm:w-2/4'>
              <div>
                <h1 className='text-xl font-semibold text-center sm:text-left text-primary-color'>
                  About us
                </h1>
                <p className='pt-2 text-center sm:text-left text-primary-color'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem quam
                  beatae illo blanditiis. Quisquam debitis dolores sint expedita consequatur illum,
                  iusto corrupti iure. Est a, eveniet perferendis quis incidunt mollitia.
                </p>
              </div>
              <div className='flex flex-wrap items-center justify-center gap-2 mt-5 sm:justify-start'>
                {contactInfo?.SocialMediaLinks && contactInfo.SocialMediaLinks?.length > 0 ? (
                  contactInfo?.SocialMediaLinks.map((el) => (
                    <Link
                      key={el.label}
                      href={el.link}
                      title={el.link}
                      target='_blank'
                      className='flex items-center justify-center w-10 h-10 transition-colors rounded-md hover:bg-blue-500 hover:text-white'
                    >
                      {socialMediaLogos[el.label]}
                    </Link>
                  ))
                ) : (
                  <div className='text-sm'>Our social media links will be here soon ...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
}
