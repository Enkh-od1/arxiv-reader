/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.10.31',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      // Хэрэв Render эсвэл өөр домэйн дээр байгаа бол нэмж болно
      // {
      //   protocol: 'https',
      //   hostname: 'strapi-arxiv-new.onrender.com',
      //   pathname: '/uploads/**',
      // },
    ],
  },
};

module.exports = nextConfig;