/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'naog.edu.mn',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '192.168.10.31',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
  // --- ЭНЭ ХЭСГИЙГ ЯГ ИНГЭЖ СОЛИОРОЙ ---
  devIndicators: false,
  // -----------------------------------
};

module.exports = nextConfig;
