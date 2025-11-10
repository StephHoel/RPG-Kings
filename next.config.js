/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'
const repo = 'RPG-Kings' // <- nome exato do seu repositório

const nextConfig = {
  // Exportação estática para GitHub Pages
  output: 'export',

  // Caminhos para Project Pages (user.github.io/<repo>)
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}` : '',
  
  // Evita redirects no GH Pages
  trailingSlash: true,

  // Imagens estáticas (obrigatório p/ export)
  images: { unoptimized: true },

  reactStrictMode: true,

  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  // Expose base path at build time to client/server code
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? `/${repo}` : '',
  },
}

export default nextConfig
