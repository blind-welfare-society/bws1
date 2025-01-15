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
        source: '/index.php/:path*', // Match any URL starting with "index.php/"
        destination: '/:path*',    // Redirect to the same path without "index.php/"
        permanent: true,   // Indicates a 301 redirect
      },
    ];
  },
};
