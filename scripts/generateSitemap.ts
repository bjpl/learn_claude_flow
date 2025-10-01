#!/usr/bin/env tsx
/**
 * Generate sitemap.xml for the documentation site
 * Run: npx tsx scripts/generateSitemap.ts
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

const SITE_URL = 'https://learn-claude-flow.example.com';

// Load documentation metadata
function loadDocumentation(): any[] {
  try {
    const docsPath = path.join(__dirname, '../public/docs/documentation.json');
    const content = fs.readFileSync(docsPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.warn('Could not load documentation.json, generating basic sitemap');
    return [];
  }
}

// Generate sitemap URLs
function generateUrls(): SitemapUrl[] {
  const urls: SitemapUrl[] = [];
  const now = new Date().toISOString().split('T')[0];

  // Homepage
  urls.push({
    loc: SITE_URL,
    lastmod: now,
    changefreq: 'daily',
    priority: 1.0,
  });

  // Search page
  urls.push({
    loc: `${SITE_URL}/search`,
    lastmod: now,
    changefreq: 'weekly',
    priority: 0.8,
  });

  // Settings page
  urls.push({
    loc: `${SITE_URL}/settings`,
    lastmod: now,
    changefreq: 'monthly',
    priority: 0.3,
  });

  // Load and add documentation pages
  const docs = loadDocumentation();
  const categories = new Set<string>();

  docs.forEach((doc: any) => {
    // Individual document
    urls.push({
      loc: `${SITE_URL}/doc/${doc.id}`,
      lastmod: doc.lastModified || now,
      changefreq: 'weekly',
      priority: 0.7,
    });

    // Track categories
    if (doc.category) {
      categories.add(doc.category);
    }
  });

  // Add category pages
  categories.forEach((category) => {
    urls.push({
      loc: `${SITE_URL}/category/${encodeURIComponent(category.toLowerCase())}`,
      lastmod: now,
      changefreq: 'weekly',
      priority: 0.6,
    });
  });

  return urls;
}

// Generate sitemap XML
function generateSitemap(urls: SitemapUrl[]): string {
  const urlElements = urls.map(url => {
    const elements = [
      `    <url>`,
      `      <loc>${url.loc}</loc>`,
    ];

    if (url.lastmod) {
      elements.push(`      <lastmod>${url.lastmod}</lastmod>`);
    }

    if (url.changefreq) {
      elements.push(`      <changefreq>${url.changefreq}</changefreq>`);
    }

    if (url.priority !== undefined) {
      elements.push(`      <priority>${url.priority.toFixed(1)}</priority>`);
    }

    elements.push(`    </url>`);
    return elements.join('\n');
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
}

// Main execution
function main() {
  console.log('Generating sitemap.xml...');

  const urls = generateUrls();
  console.log(`Generated ${urls.length} URLs`);

  const sitemap = generateSitemap(urls);

  // Write to public directory
  const outputPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outputPath, sitemap, 'utf-8');

  console.log(`✓ Sitemap generated at: ${outputPath}`);
  console.log(`  Homepage: ${SITE_URL}`);
  console.log(`  Documents: ${urls.filter(u => u.loc.includes('/doc/')).length}`);
  console.log(`  Categories: ${urls.filter(u => u.loc.includes('/category/')).length}`);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateSitemap, generateUrls };
