/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

const isGithubActions = process.env.GITHUB_ACTIONS || false

if (isGithubActions) {
  const repo = 'sqwertyl.me'
  repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '')
  let assetPrefix = `/${repo}`
  let basePath = `/${repo}`
  module.exports = {
    assetPrefix: assetPrefix,
    basePath: basePath,
  }
}

module.exports = {
  assetPrefix: '',
  basePath: '',
};