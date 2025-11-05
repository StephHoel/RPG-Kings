/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  basePath: isProd ? '/rpg-kings' : '',
  assetPrefix: isProd ? '/rpg-kings/' : '',
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
