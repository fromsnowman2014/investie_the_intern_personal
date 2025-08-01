/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@investie/types', '@investie/mock', '@investie/utils'],
  experimental: {
    optimizePackageImports: ['@investie/types', '@investie/mock', '@investie/utils']
  }
};

module.exports = nextConfig;