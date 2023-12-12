/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'utfs.io',
      'avatars.githubusercontent.com',
      'https://images.unsplash.com',
      'images.unsplash.com',
    ],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
