import { parseCsv } from '../lib/parseCsv.js'
import { toCsvUrl } from '../lib/staffCsvUrl.js'

const DEFAULT_GLOSSARY_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1L36cTtpATdld5vNmuaKZjDCXdioh3MDNp4Y2IxYciUQ/edit?gid=763511265'

export const glossaryCsvUrl = toCsvUrl(
  import.meta.env?.VITE_GLOSSARY_CSV_URL?.trim() || DEFAULT_GLOSSARY_SHEET_URL,
)

export function parseGlossaryCsv(csv) {
  const rows = parseCsv(csv.replace(/^\uFEFF/, ''), 'The glossary spreadsheet')

  if (rows.length < 2) {
    throw new Error('The glossary spreadsheet does not contain any terms.')
  }

  const headers = rows[0].map((header) => header.toLowerCase())
  const termColumn = headers.indexOf('term')
  const definitionColumn = headers.indexOf('definition')

  if (termColumn === -1 || definitionColumn === -1) {
    throw new Error(
      'The glossary spreadsheet needs Term and Definition columns.',
    )
  }

  const entries = rows.slice(1).map((fields, index) => {
    const term = fields[termColumn]?.trim() || ''
    const definition = fields[definitionColumn]?.trim() || ''

    if (!term || !definition) {
      throw new Error(
        `Glossary spreadsheet row ${index + 2} must include a term and definition.`,
      )
    }

    return { term, definition }
  })

  if (entries.length === 0) {
    throw new Error('The glossary spreadsheet does not contain any terms.')
  }

  return entries
}
