import { Link, Navigate, useParams } from 'react-router-dom'

import { getHub } from '../blog/hubs'
import { MarkdownBody } from '../blog/markdown'
import { getPost } from '../blog/posts'
import { Seo } from '../components/Seo'
import { SITE_NAME, SITE_URL } from '../config'
import { breadcrumbLd as makeBreadcrumb } from '../lib/schema'

export function BlogHubPage() {
  const { slug } = useParams()
  const hub = getHub(slug)
  if (!hub) return <Navigate to="/blog" replace />

  const url = `/blog/${hub.slug}`
  const linked = hub.posts.map(getPost).filter(Boolean)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: hub.title,
    description: hub.metaDescription,
    url: `${SITE_URL}${url}`,
    isPartOf: { '@type': 'Blog', name: `${SITE_NAME} Blog`, url: `${SITE_URL}/blog` },
    hasPart: linked.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.date,
    })),
  }
  const crumbs = makeBreadcrumb([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: hub.title, url },
  ])

  return (
    <main>
      <Seo
        title={hub.metaTitle}
        description={hub.metaDescription}
        path={url}
        type="website"
        jsonLd={jsonLd}
        breadcrumbLd={crumbs}
        publishedTime={hub.date}
        modifiedTime={hub.date}
      />
      <article className="blog-post">
        <header className="blog-post__hero">
          <div className="container blog-post__hero-inner">
            <nav className="blog-post__crumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden> / </span>
              <Link to="/blog">Blog</Link>
              <span aria-hidden> / </span>
              <span>{hub.category}</span>
            </nav>
            <p className="eyebrow">{hub.keyword}</p>
            <h1>{hub.title}</h1>
            <p className="blog-post__deck">{hub.excerpt}</p>
          </div>
        </header>
        <div className="container blog-post__layout">
          <div className="blog-post__body">
            <MarkdownBody markdown={hub.body} />
            <h2>Guides in this hub</h2>
            <ul>
              {linked.map((p) => (
                <li key={p.slug}>
                  <Link to={`/blog/${p.slug}`}>{p.title}</Link> — {p.excerpt}
                </li>
              ))}
            </ul>
          </div>
          <aside className="blog-post__aside">
            <div className="blog-aside-card blog-aside-card--muted">
              <p className="eyebrow">All hubs</p>
              <ul className="blog-related">
                <li>
                  <Link to="/blog/owner-operator-numbers">Owner-operator numbers</Link>
                </li>
                <li>
                  <Link to="/blog/ifta-and-taxes">IFTA &amp; taxes</Link>
                </li>
                <li>
                  <Link to="/blog/trucking-bookkeeping">Trucking bookkeeping</Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </article>
    </main>
  )
}
