/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['gateway']
  },
  async rewrites() {
    return [
      {
        destination: 'https://gitblogserver.cf/api/:path*',
        source: '/api/:path*',
      },
      {
        destination: 'https://gitblogserver.cf/author/:path*',
        source: '/author/:path*',
      },
      {
        destination: 'https://gitblogserver.cf/sign/:path*',
        source: '/sign/:path*',
      }
    ]
  }
}

module.exports = nextConfig
