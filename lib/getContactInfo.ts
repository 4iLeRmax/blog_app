export const getContactInfo = async (): Promise<ContactInfo> =>
  await fetch('http://localhost:4200/contactInfo').then((res) => res.json());
