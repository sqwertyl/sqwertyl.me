/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const isCustomDomain = process.env.CUSTOM_DOMAIN === 'true';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  assetPrefix: '',
  basePath: '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
