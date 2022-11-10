/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://blog-sage-pi.vercel.app',
  generateRobotsTxt: true, // (optional)
  sitemapSize: 7000,
  exclude: ['/server-sitemap-index.xml'], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: [
      `${process.env.SITE_URL}server-sitemap-index.xml`, // <==== Add here
    ],
  },
}