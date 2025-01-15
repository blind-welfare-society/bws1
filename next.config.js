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
  async redirects() {
    return [
      {
        source: '/index.php/sponsor-a-meal-on-any-special-occasion',
        destination: '/sponsor-a-meal-on-any-special-occasion',
        permanent: true, // Indicates a 301 redirect
      },
    ];
  },
};
