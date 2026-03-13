/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Дотоод IP ашиглаж байгаа үед үүнийг заавал true болгоно
    unoptimized: true, 
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.10.31',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
};

module.exports = nextConfig;
