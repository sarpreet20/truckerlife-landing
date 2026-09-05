import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

import App from './App'
import { HeadContext } from './components/seo-head'

// Renders a route to static HTML and collects the page's <head> data
// (title, meta, canonical, JSON-LD) via the Seo HeadContext.
export function render(url) {
  const collected = { head: null }
  const html = renderToString(
    <HeadContext.Provider value={(head) => (collected.head = head)}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HeadContext.Provider>,
  )
  return { html, head: collected.head }
}
