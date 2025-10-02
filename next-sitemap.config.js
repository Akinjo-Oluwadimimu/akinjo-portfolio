/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://dimimu.dev',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: [
    '/admin/*',    
    '/api/*',      
    '/404',        
    '/ai-hub/*',
    '/admin',
    '/login',
  ],
  additionalPaths: async (config) => {
    const blogPosts = [
      { slug: 'first-post', lastmod: '2025-10-01' },
      { slug: 'second-post', lastmod: '2025-10-02' },
    ];
    const projects = [
      { slug: 'portfolio-website' },
      { slug: 'ride-hailing-app' },
    ];

    return [
      ...blogPosts.map((post) => ({
        loc: `/blog/${post.slug}`,
        lastmod: post.lastmod,
        changefreq: 'weekly',
        priority: 0.8,
      })),
      ...projects.map((proj) => ({
        loc: `/projects/${proj.slug}`,
        changefreq: 'monthly',
        priority: 0.7,
      })),
    ];
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api', '/ai-hub', '/login'],
      },
    ],
  },
};
