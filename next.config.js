/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    unoptimized: true // For static export if needed
  },
  experimental: {
    typedRoutes: false
  }
};

module.exports = nextConfig;