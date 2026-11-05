import { parseCsv } from '../lib/parseCsv.js'
import { toCsvUrl } from '../lib/staffCsvUrl.js'

const DEFAULT_GUIDES_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1L36cTtpATdld5vNmuaKZjDCXdioh3MDNp4Y2IxYciUQ/edit?gid=1623606305'

export const guidesCsvUrl = toCsvUrl(
  import.meta.env?.VITE_GUIDES_CSV_URL?.trim() || DEFAULT_GUIDES_SHEET_URL,
)

function splitLines(value) {
  return value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean)
}

export function parseGuidesCsv(csv) {
  const rows = parseCsv(csv.replace(/^\uFEFF/, ''), 'The guides spreadsheet')

  if (rows.length < 2) {
    throw new Error('The guides spreadsheet does not contain any guides.')
  }

  const headers = rows[0].map((header) => header.toLowerCase())
  const requiredColumns = ['category', 'slug', 'title', 'summary']

  for (const column of requiredColumns) {
    if (!headers.includes(column)) {
      throw new Error(
        `The guides spreadsheet needs a ${column} column.`,
      )
    }
  }

  const columnIndex = Object.fromEntries(
    headers.map((header, index) => [header, index]),
  )
  const guides = rows.slice(1).map((fields, index) => {
    const value = (column) => fields[columnIndex[column]]?.trim() || ''
    const category = value('category')
    const slug = value('slug')
    const title = value('title')
    const summary = value('summary')

    if (!category || !slug || !title || !summary) {
      throw new Error(
        `Guides spreadsheet row ${index + 2} needs Category, Slug, Title and Summary.`,
      )
    }

    const images = splitLines(value('images'))
    const imageAlts = splitLines(value('imagealts'))

    if (images.length !== imageAlts.length) {
      throw new Error(
        `Guides spreadsheet row ${index + 2} must have one image description for each image.`,
      )
    }

    const guide = {
      category,
      slug,
      title,
      summary,
      paragraphs: splitLines(value('paragraphs')),
    }
    const listTitle = value('listtitle')
    const items = splitLines(value('items'))
    const closing = value('closing')

    if (listTitle) guide.listTitle = listTitle
    if (items.length > 0) guide.items = items
    if (closing) guide.closing = closing
    if (images.length > 0) {
      guide.images = images.map((src, imageIndex) => ({
        src,
        alt: imageAlts[imageIndex],
      }))
    }

    return guide
  })

  if (new Set(guides.map(({ slug }) => slug)).size !== guides.length) {
    throw new Error('The guides spreadsheet contains duplicate slugs.')
  }

  return guides
}
