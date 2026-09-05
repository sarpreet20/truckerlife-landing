import { Link, Navigate, useParams } from 'react-router-dom'

import { FaqList, MarkdownBody } from '../blog/markdown'
import { getPost, relatedPosts } from '../blog/posts'
import { Seo } from '../components/Seo'
import { APP_STORE_URL, FOUNDER_NAME, LOGO_URL, OG_IMAGE_URL, SITE_NAME, SITE_URL } from '../config'
import { breadcrumbLd as makeBreadcrumb } from '../lib/schema'

export function BlogPostPage() {
  const { slug } = useParams()
  const post = getPost(slug)
  if (!post) return <Navigate to="/blog" replace />

  const url = `/blog/${post.slug}`
  const related = relatedPosts(post)
  const modified = post.updated || post.date
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    image: [OG_IMAGE_URL],
    datePublished: post.date,
    dateModified: modified,
    keywords: post.keyword,
    author: {
      '@type': 'Person',
      name: FOUNDER_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: LOGO_URL,
        width: 180,
        height: 180,
      },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${url}` },
    timeRequired: `PT${post.readMinutes}M`,
    articleSection: post.category,
    about: 'Owner-operators',
    audience: {
      '@type': 'Audience',
      audienceType: 'Owner-operators',
    },
  }
  const faqLd = post.faq?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      }
    : undefined
  const crumbs = makeBreadcrumb([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url },
  ])

  return (
    <main>
      <Seo
        title={post.metaTitle}
        description={post.metaDescription}
        path={url}
        type="article"
        jsonLd={jsonLd}
        faqLd={faqLd}
        breadcrumbLd={crumbs}
        publishedTime={post.date}
        modifiedTime={modified}
      />
      <article className="blog-post">
        <header className="blog-post__hero">
          <div className="container blog-post__hero-inner">
            <nav className="blog-post__crumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden> / </span>
              <Link to="/blog">Blog</Link>
              <span aria-hidden> / </span>
              <span>{post.category}</span>
            </nav>
            <p className="eyebrow">{post.keyword}</p>
            <h1>{post.title}</h1>
            <p className="blog-post__deck">{post.excerpt}</p>
            <p className="blog-post__meta">
              <span>By {FOUNDER_NAME}</span>
              <span aria-hidden>·</span>
              <time dateTime={modified}>Updated {modified}</time>
              <span aria-hidden>·</span>
              <span>{post.readMinutes} minute read</span>
              <span aria-hidden>·</span>
              <span>For owner-operators</span>
            </p>
          </div>
        </header>
        <div className="container blog-post__layout">
          <div className="blog-post__body">
            <MarkdownBody markdown={post.body} />
            <FaqList faq={post.faq} />
            <p className="blog-post__disclaimer">
              Educational information for owner-operators, not tax, legal, or financial advice. Rules and rates change.
              Confirm filings and deductions with a qualified professional who knows trucking.
            </p>
          </div>
          <aside className="blog-post__aside">
            <div className="blog-aside-card">
              <p className="eyebrow">Built for the cab</p>
              <p className="blog-aside-card__title">Know the number before you book the load.</p>
              <p>
                Trucker Life AI is for owner-operators only — true rate, fuel, IFTA records, and expenses without
                dispatcher software.
              </p>
              <a className="btn btn--primary btn--block" href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
                Download for iOS
              </a>
            </div>
            {related.length > 0 && (
              <div className="blog-aside-card blog-aside-card--muted">
                <p className="eyebrow">Keep reading</p>
                <ul className="blog-related">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link to={`/blog/${item.slug}`}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </article>
    </main>
  )
}
