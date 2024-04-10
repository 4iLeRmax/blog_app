'use client';

import React, { useEffect, useState } from 'react';
import SocialMediaSelect from '@/components/SocialMediaSelect';
import SocialMediaList from '@/components/SocialMediaList';
import { updateSocialMediaLinks } from '@/lib/actions';
import ContactInfoForm from '@/components/ContactInfoForm';
import { options, socialMediaColors } from '@/data';
import { ContactInfo } from '@/types';

type EditContactInfoProps = {
  contactInfo: ContactInfo | undefined;
};

export default function EditContactInfo({ contactInfo }: EditContactInfoProps) {
  const [socialMedia, setSocialMedia] = useState<{ label: string; link: string }[]>([]);
  const [tempLink, setTempLink] = useState('');

  useEffect(() => {
    setSocialMedia(
      (contactInfo as ContactInfo).SocialMediaLinks.map(({ label, link }) => ({
        label,
        link,
      })),
    );
  }, []);

  const onSubmit = (formData: FormData) => {
    const filteredSocialMedia = socialMedia.filter((el) => el.link !== '');
    updateSocialMediaLinks(formData, filteredSocialMedia);
  };
  console.log(socialMedia);

  return (
    <>
      <div className='flex flex-col w-full gap-10 px-3 py-5 xs:px-5 glassEffect'>
        <ContactInfoForm contactInfo={contactInfo} />
        <form action={onSubmit} className='w-full'>
          <div className='flex flex-col gap-2'>
            <SocialMediaSelect
              socialMedia={socialMedia}
              setSocialMedia={setSocialMedia}
              options={options}
            />
            <SocialMediaList
              socialMedia={socialMedia}
              setSocialMedia={setSocialMedia}
              tempLink={tempLink}
              setTempLink={setTempLink}
              socialMediaColors={socialMediaColors}
            />
            <button className='flex items-center justify-center w-full h-8 mt-5 text-white bg-blue-500 rounded-xl'>
              Update Links
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
