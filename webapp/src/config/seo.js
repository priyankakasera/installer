const BASE_URL = 'https://devtoolsinstaller.com'
const SITE_NAME = 'DevTools Installer'

export function buildBreadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url ? `${BASE_URL}${item.url}` : undefined,
    })),
  }
}

export function buildFAQJsonLd(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }
}

export function buildHowToJsonLd({ name, description, steps }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      text: step,
    })),
  }
}

export function buildSoftwareApplicationJsonLd({
  name = SITE_NAME,
  description,
  version,
  downloadUrl,
} = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    url: `${BASE_URL}/`,
    description,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Windows 10, Windows 11',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    ...(version && { softwareVersion: version }),
    ...(downloadUrl && { downloadUrl }),
    featureList:
      'One-click install, Version upgrade, Version downgrade, Individual uninstall, Bulk uninstall, Setup bundles, Automatic PATH configuration, Version selection, Official sources only',
    screenshot: `${BASE_URL}/icons/og-image.png`,
  }
}

export function buildItemListJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url ? `${BASE_URL}${item.url}` : undefined,
    })),
  }
}

export { BASE_URL, SITE_NAME }
