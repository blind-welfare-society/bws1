/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dheeraj84.blindwelfaresociety.in',
        pathname: '/**', // Optional: match all paths
      }
    ],
  },
};
