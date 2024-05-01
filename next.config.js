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
  env: {
    baseURL:
      process.env.NODE_ENV === 'production'
        ? 'https://blog-app-seven-sigma.vercel.app/'
        : 'http://localhost:3000',
  },
};

module.exports = nextConfig;
