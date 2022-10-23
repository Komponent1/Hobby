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
        destination: 'http://gateway:80/api/:path*',
        source: '/api/:path*',
      },
      {
        destination: 'http://gateway:80/author/:path*',
        source: '/author/:path*',
      },
      {
        destination: 'http://gateway:80/sign/:path*',
        source: '/sign/:path*',
      }
    ]
  }
}

module.exports = nextConfig
