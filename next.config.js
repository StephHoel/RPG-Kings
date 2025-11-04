/** @type {import('next').NextConfig} */

const nextConfig = {
  basePath: '/rpg-kings',
  assetPrefix: '/rpg-kings/',
  trailingSlash: true,
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
