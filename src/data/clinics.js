import { parseCsv } from '../lib/parseCsv.js'
import { toCsvUrl } from '../lib/staffCsvUrl.js'

const DEFAULT_CLINICS_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1L36cTtpATdld5vNmuaKZjDCXdioh3MDNp4Y2IxYciUQ/edit?gid=1976278631'

export const clinicsCsvUrl = toCsvUrl(
  import.meta.env?.VITE_CLINICS_CSV_URL?.trim() || DEFAULT_CLINICS_SHEET_URL,
)

function getSocialUrl(value, column, rowNumber) {
  const trimmed = (value || '').trim()
  if (!trimmed) return ''

  try {
    const url = new URL(trimmed)
    if (['http:', 'https:'].includes(url.protocol)) return url.href
  } catch {
    // Falls through to the error below.
  }

  throw new Error(
    `Clinics spreadsheet row ${rowNumber} has an invalid ${column} link.`,
  )
}

export function parseClinicsCsv(csv) {
  const rows = parseCsv(csv.replace(/^\uFEFF/, ''), 'The clinics spreadsheet')

  if (rows.length < 2) {
    throw new Error('The clinics spreadsheet does not contain any clinics.')
  }

  const headers = rows[0].map((header) => header.toLowerCase())
  const records = rows.slice(1).map((fields) =>
    Object.fromEntries(headers.map((header, index) => [header, fields[index] || ''])),
  )
  const requiredColumns = [
    'id',
    'name',
    'shortname',
    'hostnames',
    'email',
    'phone',
    'phonedisplay',
    'address',
    'accent',
    'accenthover',
    'accenttext',
    'accentpale',
  ]

  for (const column of requiredColumns) {
    if (!headers.includes(column)) {
      throw new Error(
        `The clinics spreadsheet needs a ${column} column.`,
      )
    }
  }

  const clinics = records.map((record, index) => {
    const requiredValues = [
      record.id,
      record.name,
      record.shortname,
      record.email,
      record.phone,
      record.phonedisplay,
      record.address,
    ]

    if (requiredValues.some((value) => !value.trim())) {
      throw new Error(
        `Clinics spreadsheet row ${index + 2} is missing required details.`,
      )
    }

    const hostnames = record.hostnames
      .split(/[,\n|]/)
      .map((hostname) => hostname.trim().toLowerCase().replace(/^www\./, ''))
      .filter(Boolean)

    if (hostnames.length === 0) {
      throw new Error(
        `Clinics spreadsheet row ${index + 2} needs at least one hostname.`,
      )
    }

    return {
      id: record.id.trim(),
      name: record.name.trim(),
      shortName: record.shortname.trim(),
      hostnames,
      websiteUrl: record.websiteurl.trim(),
      logo: record.logo.trim(),
      aboutImage: record.aboutimage.trim(),
      email: record.email.trim(),
      phone: record.phone.trim(),
      phoneDisplay: record.phonedisplay.trim(),
      address: record.address.trim(),
      directionsUrl: record.directionsurl.trim(),
      facebookUrl: getSocialUrl(record.facebookurl, 'FacebookUrl', index + 2),
      instagramUrl: getSocialUrl(record.instagramurl, 'InstagramUrl', index + 2),
      accent: record.accent.trim(),
      accentHover: record.accenthover.trim(),
      accentText: record.accenttext.trim(),
      accentPale: record.accentpale.trim(),
    }
  })

  if (clinics.length < 2) {
    throw new Error('The clinics spreadsheet must contain both clinics.')
  }

  if (new Set(clinics.map(({ id }) => id)).size !== clinics.length) {
    throw new Error('The clinics spreadsheet contains duplicate clinic IDs.')
  }

  return clinics
}

export function getCurrentClinic(clinics, hostname, search) {
  const developmentClinic = new URLSearchParams(search).get('clinic')
  const normalizedHostname = hostname.toLowerCase().replace(/^www\./, '')

  return (
    clinics.find((clinic) => clinic.id === developmentClinic) ||
    clinics.find((clinic) => clinic.hostnames.includes(normalizedHostname)) ||
    clinics[0]
  )
}
