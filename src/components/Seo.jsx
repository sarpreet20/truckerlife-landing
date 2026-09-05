import { useContext, useEffect } from 'react'

import { OG_IMAGE_URL, SITE_NAME } from '../config'
import { computeHead, HeadContext } from './seo-head'

function upsertMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id)
  if (!data) {
    el?.remove()
    return
  }
  if (!el) {
    el = document.createElement('script')
    el.id = id
    el.type = 'application/ld+json'
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

export function Seo({
  title,
  description,
  path,
  type = 'website',
  jsonLd,
  faqLd,
  breadcrumbLd,
  noindex = false,
  publishedTime,
  modifiedTime,
  ogImage = OG_IMAGE_URL,
}) {
  const head = computeHead({ title, description, path, type, jsonLd, faqLd, breadcrumbLd, noindex, publishedTime, modifiedTime, ogImage })
  const recordHead = useContext(HeadContext)

  if (recordHead) {
    recordHead(head)
  }

  const {
    fullTitle,
    canonical,
    description: desc,
    type: ogType,
    jsonLd: primaryLd,
    faqLd: faqs,
    breadcrumbLd: crumbs,
    noindex: robotsNoindex,
    publishedTime: pub,
    modifiedTime: mod,
    ogImage: image,
  } = head

  useEffect(() => {
    document.title = fullTitle
    upsertMeta('name', 'description', desc)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', desc)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:type', ogType)
    upsertMeta('property', 'og:site_name', SITE_NAME)
    upsertMeta('property', 'og:locale', 'en_US')
    upsertMeta('property', 'og:image', image)
    upsertMeta('property', 'og:image:width', '1200')
    upsertMeta('property', 'og:image:height', '630')
    upsertMeta('property', 'og:image:alt', fullTitle)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', desc)
    upsertMeta('name', 'twitter:image', image)
    upsertMeta('name', 'robots', robotsNoindex ? 'noindex, follow' : 'index, follow')
    if (pub) upsertMeta('property', 'article:published_time', pub)
    if (mod) upsertMeta('property', 'article:modified_time', mod)
    upsertLink('canonical', canonical)
    upsertJsonLd('jsonld-primary', primaryLd)
    upsertJsonLd('jsonld-faq', faqs)
    upsertJsonLd('jsonld-breadcrumb', crumbs)
  }, [fullTitle, desc, canonical, ogType, primaryLd, faqs, crumbs, robotsNoindex, pub, mod, image])

  return null
}
