import { Link } from 'react-router-dom'

import { hubs } from '../blog/hubs'
import { posts } from '../blog/posts'
import { Seo } from '../components/Seo'
import { SITE_NAME, SITE_URL } from '../config'

export function BlogIndexPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${SITE_NAME} Blog`,
    description:
      'Guides for owner-operators: cost per mile, profit per mile, IFTA, bookkeeping, deadhead, and tax records.',
    url: `${SITE_URL}/blog`,
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.date,
      keywords: p.keyword,
    })),
  }

  return (
    <main>
      <Seo
        title="Owner-Operator Blog: Cost Per Mile, IFTA, and Profit"
        description="Practical guides for owner-operators — cost per mile, profit per mile, IFTA, bookkeeping, deadhead, and expenses. Written for one-truck operators, not fleets."
        path="/blog"
        jsonLd={jsonLd}
      />
      <section className="blog-hero">
        <div className="container">
          <p className="eyebrow">Owner-operator only</p>
          <h1 className="section__title">The numbers, IFTA, and books — without the cubicle software.</h1>
          <p className="blog-hero__lead">
            Short reads for solo owner-operators. Cost per mile, true rate, quarterly IFTA, and the weekly habits that
            keep you from guessing when a broker calls.
          </p>
        </div>
      </section>
      <section className="section section--alt">
        <div className="container">
          <div className="section__header">
            <p className="eyebrow">Start with a hub</p>
            <h2 className="section__title">Three stacks. Every guide in order.</h2>
          </div>
          <div className="blog-grid">
            {hubs.map((hub) => (
              <article key={hub.slug} className="blog-card">
                <p className="blog-card__meta">
                  <span>{hub.category}</span>
                  <span aria-hidden>·</span>
                  <span>{hub.posts.length} guides</span>
                </p>
                <h2 className="blog-card__title">
                  <Link to={`/blog/${hub.slug}`}>{hub.title}</Link>
                </h2>
                <p className="blog-card__excerpt">{hub.excerpt}</p>
                <Link to={`/blog/${hub.slug}`} className="blog-card__more">
                  Open hub →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section blog-index">
        <div className="container">
          <div className="section__header">
            <p className="eyebrow">All guides</p>
            <h2 className="section__title">Every article</h2>
          </div>
          <div className="blog-grid">
            {posts.map((post) => (
              <article key={post.slug} className="blog-card">
                <p className="blog-card__meta">
                  <span>{post.category}</span>
                  <span aria-hidden>·</span>
                  <span>{post.readMinutes} min read</span>
                </p>
                <h2 className="blog-card__title">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="blog-card__excerpt">{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="blog-card__more">
                  Read article →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
