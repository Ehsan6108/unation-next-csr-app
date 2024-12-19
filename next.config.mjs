/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/orbweaver/:path*',
        destination: 'https://orbweaver2staging-udata.unation.com/api/:path*',
      },
      {
        source: '/wp-json/:path*',
        destination: 'https://test.unationstaging.com/wp-json/:path*',
      }
    ];
  },
  images: {
    domains: ['images2.unation.com', 'assets-qa.unation.com','qa.unation.com'],
  },
};

export default nextConfig;
