/**
 * Cookie consent utilities — shared between CookieConsent and AdSenseLoader.
 */

export const CONSENT_KEY = 'cookie_consent'
export const CONSENT_ACCEPTED = 'accepted'
export const CONSENT_DECLINED = 'declined'

/** Read the stored consent value. Returns 'accepted', 'declined', or null (not yet set). */
export function getConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY)
  } catch {
    return null
  }
}

/** Persist a consent decision and notify all listeners in the same tab. */
export function setConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, value)
  } catch {
    // localStorage unavailable — consent cannot be persisted
  }
  window.dispatchEvent(new CustomEvent('consentUpdated', { detail: { value } }))
}
