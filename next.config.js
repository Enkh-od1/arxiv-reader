/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
  remotePatterns: [
    {
      protocol: 'http',
      hostname: 'localhost',
      port: '1337',
      pathname: '/**',  // '/uploads/**' биш '/**' болго – бүх path-г зөвшөөр
    },
  ],
}
};

module.exports = nextConfig;