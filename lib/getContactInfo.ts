// export const getContactInfo = async (): Promise<ContactInfo> =>
//   await fetch('http://localhost:4200/contactInfo').then((res) => res.json());

import { ContactInfo } from '@/types';
import prisma from './prisma';

export const getContactInfo = async (): Promise<ContactInfo | undefined> => {
  try {
    const contactInfo = await prisma.contactInfo.findMany({
      include: {
        SocialMediaLinks: true,
      },
    });
    return contactInfo[0];
  } catch {
    console.error('ContactInfo');
  }
};
