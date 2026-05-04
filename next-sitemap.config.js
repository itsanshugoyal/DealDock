/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://dealdock.in",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  outDir: "./out",
};
