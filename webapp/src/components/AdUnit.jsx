/**
 * AdUnit — Google AdSense ad slot.
 * Replace XXXXXXXXXX values with real publisher ID and slot IDs from
 * your AdSense dashboard before enabling AdSenseLoader.
 */
export const PUB_ID = 'ca-pub-XXXXXXXXXXXXXXXXX'

export const SLOTS = {
  GUIDE_HEADER: 'XXXXXXXXXX',
  GUIDE_MID: 'XXXXXXXXXX',
  GUIDE_BOTTOM: 'XXXXXXXXXX',
  ARTICLE_MID: 'XXXXXXXXXX',
  ARTICLE_BOTTOM: 'XXXXXXXXXX',
  GUIDES_INDEX: 'XXXXXXXXXX',
  HOME_BOTTOM: 'XXXXXXXXXX',
}

// Slot IDs are still placeholders — render nothing until real IDs are configured.
const PLACEHOLDER = 'XXXXXXXXXX'
const slotsConfigured = Object.values(SLOTS).every((s) => s !== PLACEHOLDER)

export default function AdUnit({
  slot,
  format = 'auto',
  layout,
  className = '',
  label = true,
}) {
  if (!slotsConfigured) return null

  return (
    <div className={`adunit-wrap ${className}`} aria-label="Advertisement">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={PUB_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        {...(layout ? { 'data-ad-layout': layout } : {})}
      />
    </div>
  )
}
