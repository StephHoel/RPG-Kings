/** @type {import('next').NextConfig} */

const nextConfig = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  reactStrictMode: true,
  // experimental: { appDir: true }
}

export default nextConfig
