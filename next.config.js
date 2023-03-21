/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

const isGithubActions = process.env.GITHUB_ACTIONS || false

let assetPrefix = '';
let basePath = '';

if (isGithubActions) {
  const repo = '/sqwertyl.me/'
  // repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '')
  assetPrefix = `/${repo}`
  basePath = `/${repo}`
}

module.exports = {
  assetPrefix: assetPrefix,
  basePath: basePath,
};