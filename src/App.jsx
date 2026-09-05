import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'

import { getHub } from './blog/hubs'
import { getPost } from './blog/posts'
import { SiteLayout } from './components/SiteLayout'
import { NotFoundPage } from './pages/NotFoundPage'

const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })))
const BlogIndexPage = lazy(() => import('./pages/BlogIndexPage').then((m) => ({ default: m.BlogIndexPage })))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage').then((m) => ({ default: m.BlogPostPage })))
const BlogHubPage = lazy(() => import('./pages/BlogHubPage').then((m) => ({ default: m.BlogHubPage })))

function BlogSlugPage() {
  const { slug } = useParams()
  if (getHub(slug)) return <BlogHubPage />
  if (getPost(slug)) return <BlogPostPage />
  return <Navigate to="/blog" replace />
}

export default function App() {
  return (
    <SiteLayout>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogIndexPage />} />
          <Route path="/blog/:slug" element={<BlogSlugPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </SiteLayout>
  )
}
