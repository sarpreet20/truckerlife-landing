import { APP_STORE_URL, FOUNDER_NAME, LOGO_URL, OG_IMAGE_URL, SITE_NAME, SITE_URL } from '../config'

export function organizationLd() {
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL,
      width: 180,
      height: 180,
    },
    founder: { '@type': 'Person', name: FOUNDER_NAME },
    sameAs: [APP_STORE_URL],
  }
}

export function websiteLd() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { '@id': `${SITE_URL}/#organization` },
    description:
      'AI co-driver for owner-operators: loads, fuel, deadhead, IFTA, and true profit per mile from the cab.',
  }
}

export function softwareApplicationLd() {
  return {
    '@type': 'SoftwareApplication',
    name: SITE_NAME,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'iOS',
    url: SITE_URL,
    image: OG_IMAGE_URL,
    screenshot: [
      `${SITE_URL}/screens/voice-log.webp`,
      `${SITE_URL}/screens/loads.webp`,
      `${SITE_URL}/screens/reports.webp`,
    ],
    offers: {
      '@type': 'Offer',
      price: '29.00',
      priceCurrency: 'USD',
      url: APP_STORE_URL,
    },
    audience: { '@type': 'Audience', audienceType: 'Owner-operators' },
    description:
      'AI co-driver for owner-operators: loads, fuel, deadhead, IFTA, and true profit per mile from the cab.',
    publisher: { '@id': `${SITE_URL}/#organization` },
  }
}

export function breadcrumbLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  }
}

export function homeJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationLd(), websiteLd(), softwareApplicationLd()],
  }
}
