/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://dhananjaykakade.tech',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/admin', '/404', '/server-error'], // optional, exclude private pages
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      // Add additional sitemap links here if needed
      // 'https://dhananjaykakade.tech/blog-sitemap.xml',
    ],
  },
};

module.exports = config;
