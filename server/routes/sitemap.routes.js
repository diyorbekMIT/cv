const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/sitemap.xml', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    const baseUrl = 'https://diyorbek-hire.me';

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Static pages
    const staticPages = ['', '/about', '/portfolio', '/blog'];
    staticPages.forEach(page => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}${page}</loc>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>${page === '' ? '1.0' : '0.8'}</priority>\n`;
      xml += `  </url>\n`;
    });

    // Dynamic blog posts
    posts.forEach(post => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/blog/${post._id}</loc>\n`;
      xml += `    <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).end();
  }
});

module.exports = router;
