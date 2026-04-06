import { Helmet } from 'react-helmet-async'
import { BASE_URL, SITE_NAME } from '../config/seo'

const DEFAULT_OG_IMAGE = `${BASE_URL}/icons/og-image.png`

export default function SEO({
  title,
  description,
  keywords,
  path = '/',
  type = 'website',
  image,
  imageAlt,
  noindex = false,
  jsonLd,
  children,
}) {
  const canonicalUrl = `${BASE_URL}${path}`
  const ogImage = image ? `${BASE_URL}${image}` : DEFAULT_OG_IMAGE
  const ogImageAlt = imageAlt || title

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      )}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={ogImageAlt} />

      {/* JSON-LD structured data */}
      {jsonLd && !Array.isArray(jsonLd) && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
      {jsonLd && Array.isArray(jsonLd) &&
        jsonLd.map((ld, i) => (
          <script key={i} type="application/ld+json">
            {JSON.stringify(ld)}
          </script>
        ))}
      {children}
    </Helmet>
  )
}
