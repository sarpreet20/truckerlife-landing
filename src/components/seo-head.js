import { createContext } from 'react'

import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from '../config'

// During prerendering (SSG) the entry-server provides a `recordHead` function
// via this context; the Seo component hands it the page's head data so the
// build script can inject it into the static HTML. On the client the context
// is null and Seo upserts the tags from a useEffect instead.
export const HeadContext = createContext(null)

export function computeHead({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  type = 'website',
  jsonLd,
  faqLd,
  noindex = false,
}) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
  const canonical = `${SITE_URL}${path}`
  return { fullTitle, canonical, description, type, jsonLd, faqLd, noindex }
}
