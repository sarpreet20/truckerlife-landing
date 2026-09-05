// Prerender all routes to static HTML and generate sitemap.xml.
// Runs after `vite build` (client) and `vite build --ssr` (server bundle).
//
//   vite build && vite build --ssr src/entry-server.jsx --outDir dist-ssr
//   node scripts/prerender.mjs

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'

import { posts } from '../src/blog/posts.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const ssrEntry = join(root, 'dist-ssr', 'entry-server.js')

if (!existsSync(ssrEntry)) {
  console.error('Missing dist-ssr/entry-server.js — run the SSR build first.')
  process.exit(1)
}

const { render } = await import(pathToFileURL(ssrEntry).href)
const template = readFileSync(join(dist, 'index.html'), 'utf8')

const SITE_URL = 'https://www.truckerlifeai.com'
const OG_IMAGE_URL = `${SITE_URL}/og-image.png`

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function headTags(head) {
  const robots = head.noindex ? 'noindex, follow' : 'index, follow'
  const tags = [
    `<title>${esc(head.fullTitle)}</title>`,
    `<meta name="description" content="${esc(head.description)}" />`,
    `<link rel="canonical" href="${head.canonical}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<meta property="og:type" content="${head.type}" />`,
    `<meta property="og:site_name" content="Trucker Life AI" />`,
    `<meta property="og:title" content="${esc(head.fullTitle)}" />`,
    `<meta property="og:description" content="${esc(head.description)}" />`,
    `<meta property="og:url" content="${head.canonical}" />`,
    `<meta property="og:image" content="${OG_IMAGE_URL}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(head.fullTitle)}" />`,
    `<meta name="twitter:description" content="${esc(head.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE_URL}" />`,
  ]
  if (head.jsonLd) {
    tags.push(`<script type="application/ld+json">${JSON.stringify(head.jsonLd)}</script>`)
  }
  if (head.faqLd) {
    tags.push(`<script type="application/ld+json">${JSON.stringify(head.faqLd)}</script>`)
  }
  return tags.join('\n    ')
}

function buildPage(url) {
  const { html, head } = render(url)
  if (!head) throw new Error(`No head collected for ${url} — is <Seo> rendered on this page?`)
  let page = template.replace(
    /<!-- seo-head:start -->[\s\S]*?<!-- seo-head:end -->/,
    `<!-- seo-head:start -->\n    ${headTags(head)}\n    <!-- seo-head:end -->`,
  )
  page = page.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
  return page
}

const routes = ['/', '/blog', ...posts.map((p) => `/blog/${p.slug}`)]

for (const route of routes) {
  const page = buildPage(route)
  const out = route === '/' ? join(dist, 'index.html') : join(dist, route, 'index.html')
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, page)
  console.log(`prerendered ${route}`)
}

// Static 404 page — Vercel serves 404.html with a real 404 status for
// unknown paths (no catch-all rewrite), which fixes soft-404s.
writeFileSync(join(dist, '404.html'), buildPage('/404'))
console.log('prerendered /404 -> 404.html')

// --- sitemap.xml (generated from posts.js so it can never drift) ---
const today = new Date().toISOString().slice(0, 10)
const urls = [
  { loc: '/', lastmod: today, changefreq: 'weekly', priority: '1.0' },
  { loc: '/blog', lastmod: today, changefreq: 'weekly', priority: '0.9' },
  ...posts.map((p) => ({
    loc: `/blog/${p.slug}`,
    lastmod: p.date,
    changefreq: 'monthly',
    priority: '0.8',
  })),
  { loc: '/legal/', lastmod: today, changefreq: 'yearly', priority: '0.3' },
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

writeFileSync(join(dist, 'sitemap.xml'), sitemap)
writeFileSync(join(root, 'public', 'sitemap.xml'), sitemap)
console.log(`sitemap.xml written (${urls.length} URLs)`)
