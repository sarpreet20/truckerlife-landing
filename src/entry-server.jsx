import { prerender } from 'react-dom/static'
import { StaticRouter } from 'react-router-dom'

import App from './App'
import { HeadContext } from './components/seo-head'

// Awaits Suspense/lazy so route-level code splitting still prerenders full HTML.
export async function render(url) {
  const collected = { head: null }
  const { prelude } = await prerender(
    <HeadContext.Provider value={(head) => (collected.head = head)}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HeadContext.Provider>,
  )

  const reader = prelude.getReader()
  const decoder = new TextDecoder()
  let html = ''
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    html += decoder.decode(value, { stream: true })
  }
  html += decoder.decode()
  return { html, head: collected.head }
}
