import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  clinicsCsvUrl,
  getCurrentClinic,
  parseClinicsCsv,
} from '../data/clinics.js'
import { glossaryCsvUrl, parseGlossaryCsv } from '../data/glossary.js'
import { guidesCsvUrl, parseGuidesCsv } from '../data/serviceGuides.js'
import { parseStaffCsv } from '../data/staff.js'
import { staffCsvUrl } from '../lib/staffCsvUrl.js'
import { SheetDataContext } from './sheetDataContext.js'

// The last successful load of each sheet is kept in the browser so repeat
// visits render straight away while fresh data is fetched in the background.
// Bump the version if the shape of the parsed data changes.
const CACHE_KEY = 'vet-sheet-data-v1'

function readCachedData() {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY))
    return cached && typeof cached === 'object' ? cached : {}
  } catch {
    return {}
  }
}

let cachedData = readCachedData()

function writeCachedSheet(key, value) {
  cachedData = { ...cachedData, [key]: value }
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cachedData))
  } catch {
    // Storage can be full or blocked (private mode); the site works without it.
  }
}

function errorMessage(error) {
  return error instanceof Error ? error.message : 'An unexpected error occurred.'
}

async function loadSheet(url, name, signal, parse) {
  const response = await fetch(url, { signal })
  if (!response.ok) {
    throw new Error(`${name} spreadsheet returned HTTP ${response.status}.`)
  }
  return parse(await response.text())
}

// Staff rows are filtered per clinic later, so the raw CSV is what gets cached.
const keepStaffCsv = (csv) => ({ csv })

// Loads one sheet independently of the others. `data` is null until the first
// load (or cached copy) is available; a failed refresh keeps showing cached data.
function useSheet(key, url, name, parse) {
  const [data, setData] = useState(() => cachedData[key] ?? null)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    if (!url) return

    const controller = new AbortController()
    loadSheet(url, name, controller.signal, parse).then(
      (freshData) => {
        setData(freshData)
        setError('')
        writeCachedSheet(key, freshData)
      },
      (loadError) => {
        if (loadError instanceof Error && loadError.name === 'AbortError') return
        setError(errorMessage(loadError))
      },
    )
    return () => controller.abort()
  }, [key, url, name, parse, attempt])

  const retry = useCallback(() => {
    setError('')
    setAttempt((previousAttempt) => previousAttempt + 1)
  }, [])

  return {
    data,
    error: url ? error : `The ${name.toLowerCase()} spreadsheet URL has not been configured.`,
    retry,
  }
}

// staff is null while loading, so the team page can show a placeholder.
function getClinicStaff(staffSheet, clinicId) {
  if (!staffSheet.data && !staffSheet.error) {
    return { staff: null, staffError: '' }
  }

  try {
    if (!staffSheet.data) throw new Error(staffSheet.error)

    const staff = parseStaffCsv(staffSheet.data.csv, clinicId)
    if (staff.length === 0) {
      throw new Error(`No staff rows were found for clinic "${clinicId}".`)
    }

    return { staff, staffError: '' }
  } catch (error) {
    return {
      staff: [],
      staffError: `Staff details could not be loaded from the spreadsheet. ${errorMessage(error)}`,
    }
  }
}

// Only appears if loading takes a moment, so fast loads don't flash a spinner.
function LoadingSpinner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status">
      <span className="sr-only">Loading</span>
      {visible && (
        <span
          aria-hidden="true"
          className="h-8 w-8 animate-spin rounded-full border-2 border-[#e5ded6] border-t-[var(--clinic-accent,#e77826)]"
        />
      )}
    </div>
  )
}

export function SheetDataProvider({ children }) {
  // Only the clinics sheet holds up the page, since the header, footer and
  // colours all depend on it. The other sheets fill in their own sections.
  const clinics = useSheet('clinics', clinicsCsvUrl, 'Clinics', parseClinicsCsv)
  const guides = useSheet('serviceGuides', guidesCsvUrl, 'Guides', parseGuidesCsv)
  const glossary = useSheet(
    'glossaryEntries',
    glossaryCsvUrl,
    'Glossary',
    parseGlossaryCsv,
  )
  const staffSheet = useSheet('staffSheet', staffCsvUrl, 'Staff', keepStaffCsv)

  const clinicList = clinics.data?.length ? clinics.data : null

  const currentClinic = useMemo(
    () =>
      clinicList &&
      getCurrentClinic(clinicList, window.location.hostname, window.location.search),
    [clinicList],
  )

  const { data: staffData, error: staffLoadError, retry: retryStaff } = staffSheet

  const value = useMemo(() => {
    if (!currentClinic) return null

    return {
      clinics: clinicList,
      currentClinic,
      otherClinic: clinicList.find((clinic) => clinic.id !== currentClinic.id),
      serviceGuides: guides.data,
      guidesError: guides.data
        ? ''
        : guides.error &&
          `Guides could not be loaded from the spreadsheet. ${guides.error}`,
      retryGuides: guides.retry,
      glossaryEntries: glossary.data,
      glossaryError: glossary.data
        ? ''
        : glossary.error &&
          `Glossary terms could not be loaded from the spreadsheet. ${glossary.error}`,
      retryGlossary: glossary.retry,
      ...getClinicStaff(
        { data: staffData, error: staffLoadError },
        currentClinic.id,
      ),
      retryStaff,
    }
  }, [
    clinicList,
    currentClinic,
    guides.data,
    guides.error,
    guides.retry,
    glossary.data,
    glossary.error,
    glossary.retry,
    staffData,
    staffLoadError,
    retryStaff,
  ])

  // A failed background refresh keeps showing the cached data; the error page
  // is only for visitors with nothing to show yet.
  if (!value && clinics.error) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-12">
        <p
          className="border-l-4 border-amber-600 bg-amber-50 px-4 py-3 text-amber-950"
          role="alert"
        >
          Website information could not be loaded from Google Sheets.{' '}
          {clinics.error}
        </p>
        <button
          className="mt-4 rounded-sm bg-[var(--clinic-accent,#e77826)] px-4 py-2 font-semibold text-white"
          onClick={clinics.retry}
          type="button"
        >
          Try again
        </button>
      </main>
    )
  }

  if (!value) return <LoadingSpinner />

  return (
    <SheetDataContext.Provider value={value}>
      {children}
    </SheetDataContext.Provider>
  )
}
