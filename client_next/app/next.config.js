/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_IMAGE]
  },
  async rewrites() {
    return [
      {
        destination: `${process.env.NEXT_PUBLIC_BASEURL}/api/:path*`,
        source: '/api/:path*',
      },
      {
        destination: `${process.env.NEXT_PUBLIC_BASEURL}/author/:path*`,
        source: '/author/:path*',
      },
      {
        destination: `${process.env.NEXT_PUBLIC_BASEURL}/sign/:path*`,
        source: '/sign/:path*',
      }
    ]
  },
}

module.exports = nextConfig
