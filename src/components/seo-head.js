import { createContext } from 'react'

import { DEFAULT_DESCRIPTION, OG_IMAGE_URL, SITE_NAME, SITE_URL } from '../config'

export const HeadContext = createContext(null)

export function computeHead({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  type = 'website',
  jsonLd,
  faqLd,
  breadcrumbLd,
  noindex = false,
  publishedTime,
  modifiedTime,
  ogImage = OG_IMAGE_URL,
}) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
  const canonical = `${SITE_URL}${path}`
  return {
    fullTitle,
    canonical,
    description,
    type,
    jsonLd,
    faqLd,
    breadcrumbLd,
    noindex,
    publishedTime,
    modifiedTime,
    ogImage,
  }
}
