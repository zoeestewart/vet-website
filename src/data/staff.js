function parseCsv(csv) {
  const rows = []
  let row = []
  let field = ''
  let quoted = false

  for (let index = 0; index < csv.length; index += 1) {
    const character = csv[index]

    if (character === '"' && quoted && csv[index + 1] === '"') {
      field += '"'
      index += 1
    } else if (character === '"') {
      quoted = !quoted
    } else if (character === ',' && !quoted) {
      row.push(field.trim())
      field = ''
    } else if ((character === '\n' || character === '\r') && !quoted) {
      row.push(field.trim())
      if (row.some(Boolean)) rows.push(row)
      row = []
      field = ''
      if (character === '\r' && csv[index + 1] === '\n') index += 1
    } else {
      field += character
    }
  }

  if (quoted) {
    throw new Error('The staff spreadsheet contains an unclosed quoted field.')
  }

  row.push(field.trim())
  if (row.some(Boolean)) rows.push(row)
  return rows
}

export function parseStaffCsv(csv, clinicId) {
  const rows = parseCsv(csv.replace(/^\uFEFF/, ''))

  if (rows.length < 2) {
    throw new Error('The staff spreadsheet does not contain any staff rows.')
  }

  const headers = rows[0].map((header) => header.toLowerCase())
  const nameColumn = headers.indexOf('name')
  const roleColumn = headers.includes('role')
    ? headers.indexOf('role')
    : headers.indexOf('title')
  const bioColumn = headers.includes('bio')
    ? headers.indexOf('bio')
    : headers.indexOf('blurb')
  const photoColumn = headers.includes('photo')
    ? headers.indexOf('photo')
    : -1

  if (nameColumn === -1 || roleColumn === -1) {
    throw new Error(
      'The staff spreadsheet needs a Name column and a Role or Title column.',
    )
  }

  const columnIndex = Object.fromEntries(
    headers.map((header, index) => [header, index]),
  )

  return rows.slice(1).flatMap((fields, index) => {
    const value = (column) => fields[columnIndex[column]]?.trim() || ''
    const name = fields[nameColumn]?.trim() || ''
    const role = fields[roleColumn]?.trim() || ''
    const bio = bioColumn === -1 ? '' : fields[bioColumn]?.trim() || ''
    const clinic = value('clinic')

    if (!name && !role && !bio && !clinic) {
      return []
    }

    if (!name || !role) {
      throw new Error(
        `Staff spreadsheet row ${index + 2} must include a name and a role or title.`,
      )
    }

    if (clinic && clinic !== clinicId) {
      return []
    }

    return [
      {
        name,
        role,
        bio,
        photo: photoColumn === -1 ? '' : fields[photoColumn]?.trim() || '',
      },
    ]
  })
}
