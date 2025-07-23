// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dkm46q09h/image/upload/**', // Adjust this if your Cloudinary path changes significantly
      },
    ],
  },
};

module.exports = nextConfig;