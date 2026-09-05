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

export function Seo(props) {
  const head = computeHead(props)
  const recordHead = useContext(HeadContext)

  // Server render (prerender): hand the head data to the collector.
  // Client render: recordHead is null and the effect below owns <head>.
  if (recordHead) {
    recordHead(head)
  }

  const { fullTitle, canonical, description, type, jsonLd, faqLd, noindex } = head

  useEffect(() => {
    document.title = fullTitle
    upsertMeta('name', 'description', description)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:site_name', SITE_NAME)
    upsertMeta('property', 'og:image', OG_IMAGE_URL)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', OG_IMAGE_URL)
    upsertMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow')
    upsertLink('canonical', canonical)
    upsertJsonLd('jsonld-primary', jsonLd)
    upsertJsonLd('jsonld-faq', faqLd)
  }, [fullTitle, description, canonical, type, jsonLd, faqLd, noindex])

  return null
}
