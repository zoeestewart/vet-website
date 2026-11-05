const DEFAULT_STAFF_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1L36cTtpATdld5vNmuaKZjDCXdioh3MDNp4Y2IxYciUQ/export?format=csv&gid=0'

export function toCsvUrl(configuredUrl) {
  if (!configuredUrl) return ''

  const spreadsheetMatch = configuredUrl.match(
    /^https:\/\/docs\.google\.com\/spreadsheets\/d\/([^/?#]+)\/edit(?:[?#]|$)/i,
  )

  if (!spreadsheetMatch) return configuredUrl

  const gid = configuredUrl.match(/[?&#]gid=(\d+)/)?.[1] || '0'
  return `https://docs.google.com/spreadsheets/d/${spreadsheetMatch[1]}/export?format=csv&gid=${gid}`
}

export const staffCsvUrl = toCsvUrl(
  import.meta.env?.VITE_STAFF_CSV_URL?.trim() || DEFAULT_STAFF_SHEET_URL,
)
