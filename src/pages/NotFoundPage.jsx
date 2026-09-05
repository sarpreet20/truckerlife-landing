import { Link } from 'react-router-dom'

import { Seo } from '../components/Seo'

export function NotFoundPage() {
  return (
    <main className="section">
      <Seo title="Page not found" description="That page does not exist on Trucker Life AI." path="/404" noindex />
      <div className="container" style={{ textAlign: 'center', padding: '64px 0' }}>
        <p className="eyebrow">404</p>
        <h1 className="section__title">This page is not on the map.</h1>
        <p className="section__lead">The link may be old. Try the owner-operator blog or head home.</p>
        <p style={{ marginTop: 28, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link className="btn btn--primary" to="/">
            Home
          </Link>
          <Link className="btn btn--outline" to="/blog">
            Blog
          </Link>
        </p>
      </div>
    </main>
  )
}
