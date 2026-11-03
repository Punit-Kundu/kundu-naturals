import { readdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { absoluteUrl, PAGE_SEO, SITE_URL } from '../src/seo/seoConfig.js';

const publicDirectory = resolve('public');
const productDirectory = resolve(publicDirectory, 'images/Kundu-Naturals-All-Products');
const productFiles = await readdir(productDirectory);
const productPaths = productFiles
  .filter((file) => file.endsWith('.webp'))
  .map((file) => `/products/${file.replace(/^\d+-kundu-naturals-/, '').replace(/\.webp$/, '')}`);
const paths = [...Object.keys(PAGE_SEO), ...productPaths];
const urls = paths.map((path) => `  <url><loc>${absoluteUrl(path)}</loc></url>`).join('\n');
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  urls,
  '</urlset>',
  '',
].join('\n');
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL.replace(/\/+$/, '')}/sitemap.xml\n`;

await Promise.all([
  writeFile(resolve(publicDirectory, 'sitemap.xml'), sitemap),
  writeFile(resolve(publicDirectory, 'robots.txt'), robots),
]);
