/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.cloudflare.steamstatic.com',
        port: '',
      }
    ]
  },
  reactStrictMode: true,
  swcMinify: true,

  async rewrites() {
    return [
      {
        source: '/IPlayerService/:path*',
        destination: "https://api.steampowered.com/IPlayerService/:path*",
      },
      {
        source: '/app/:path*',
        destination: 'https://store.steampowered.com/app/:path*',
      }
    ]
  }
}

module.exports = nextConfig
