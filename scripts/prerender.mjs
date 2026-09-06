import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const SITE_URL = "https://www.truckerlifeai.com";

const { render, SEO_ROUTES } = await import(
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

fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
