'use client';

import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import { Session } from 'next-auth';

type EditPersonalInfoProps = {
  session: Session;
};

export default function EditPersonalInfo({ session }: EditPersonalInfoProps) {
  const [file, setFile] = useState('');

  return (
    <>
      <div className='flex items-start gap-5'>
        <div>
          <ImageUploader file={file} setFile={setFile} />
        </div>
        <form action=''>
          <div className='grid grid-cols-3 gap-3'>
            <input
              type='text'
              placeholder='Username...'
              name='username'
              defaultValue={session.user?.name as string}
            />
            <input type='text' placeholder='Location...' name='location' />
            <input type='text' placeholder='Phone number...' name='phone' />
          </div>
        </form>
      </div>
    </>
  );
}
