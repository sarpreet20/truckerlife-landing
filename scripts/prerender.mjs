import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const SITE_URL = "https://www.truckerlifeai.com";

const { render, SEO_ROUTES, posts } = await import(
  path.join(root, "dist-ssr", "entry-server.js")
);

const template = fs.readFileSync(path.join(distDir, "index.html"), "utf-8");

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function replaceAttr(html, pattern, value) {
  return html.replace(pattern, (full, prefix, _old, suffix) => `${prefix}${escapeHtml(value)}${suffix}`);
}

function renderPage(routePath) {
  const meta = SEO_ROUTES[routePath];
  const appHtml = render(routePath);
  const url = routePath === "/" ? `${SITE_URL}/` : `${SITE_URL}${routePath}`;

  let html = template;
  html = html.replace(
    /(<title>)([\s\S]*?)(<\/title>)/,
    (_full, p, _o, s) => `${p}${escapeHtml(meta.title)}${s}`
  );
  html = replaceAttr(html, /(<meta name="description" content=")([^"]*)("\s*\/>)/, meta.description);
  html = replaceAttr(html, /(<meta name="robots" content=")([^"]*)("\s*\/>)/, meta.noindex ? "noindex, follow" : "index, follow");
  html = replaceAttr(html, /(<link rel="canonical" href=")([^"]*)("\s*\/>)/, url);
  html = replaceAttr(html, /(<meta property="og:title" content=")([^"]*)("\s*\/>)/, meta.title);
  html = replaceAttr(html, /(<meta property="og:description" content=")([^"]*)("\s*\/>)/, meta.description);
  html = replaceAttr(html, /(<meta property="og:url" content=")([^"]*)("\s*\/>)/, url);
  html = replaceAttr(html, /(<meta name="twitter:title" content=")([^"]*)("\s*\/>)/, meta.title);
  html = replaceAttr(html, /(<meta name="twitter:description" content=")([^"]*)("\s*\/>)/, meta.description);

  if (meta.jsonLd) {
    const ldScript = `<script type="application/ld+json" id="page-jsonld">${JSON.stringify(meta.jsonLd)}</script>\n  </head>`;
    html = html.replace(/<\/head>/, ldScript);
  }

  html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  return html;
}

const routes = Object.keys(SEO_ROUTES);
for (const routePath of routes) {
  const html = renderPage(routePath);
  const outPath =
    routePath === "/"
      ? path.join(distDir, "index.html")
      : routePath === "/404"
      ? path.join(distDir, "404.html")
      : path.join(distDir, routePath.replace(/^\//, ""), "index.html");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html);
  console.log(`prerendered ${routePath} -> ${path.relative(distDir, outPath)}`);
}

/* ---- sitemap.xml + rss.xml generated from the same route/post data ---- */
const today = new Date().toISOString().slice(0, 10);
const postBySlugPath = new Map(posts.map((p) => [`/blog/${p.slug}`, p]));
const STATIC_EXTRA = ["/legal", "/privacy", "/terms"];

function priority(routePath) {
  if (routePath === "/") return "1.0";
  if (postBySlugPath.has(routePath)) return "0.7";
  if (routePath === "/blog") return "0.7";
  return "0.8";
}

const sitemapRoutes = [...routes.filter((r) => r !== "/404" && !SEO_ROUTES[r].noindex), ...STATIC_EXTRA];
const urlEntries = sitemapRoutes
  .map((r) => {
    const post = postBySlugPath.get(r);
    const lastmod = post ? post.updated || post.date : today;
    const loc = r === "/" ? `${SITE_URL}/` : `${SITE_URL}${r}`;
    const pr = STATIC_EXTRA.includes(r) ? "0.3" : priority(r);
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${pr}</priority>\n  </url>`;
  })
  .join("\n");
fs.writeFileSync(
  path.join(distDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`
);
console.log(`wrote sitemap.xml (${sitemapRoutes.length} urls)`);

const items = [...posts]
  .sort((a, b) => (b.date > a.date ? 1 : -1))
  .map(
    (p) =>
      `    <item>\n      <title>${escapeHtml(p.title)}</title>\n      <link>${SITE_URL}/blog/${p.slug}</link>\n      <guid>${SITE_URL}/blog/${p.slug}</guid>\n      <pubDate>${new Date(p.date).toUTCString()}</pubDate>\n      <description>${escapeHtml(p.metaDescription)}</description>\n    </item>`
  )
  .join("\n");
fs.writeFileSync(
  path.join(distDir, "rss.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>Trucker Life AI</title>\n    <link>${SITE_URL}/</link>\n    <description>Owner-operator guides: cost per mile, IFTA, bookkeeping, and true rate.</description>\n    <language>en-us</language>\n    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n${items}\n  </channel>\n</rss>\n`
);
console.log(`wrote rss.xml (${posts.length} items)`);

fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
