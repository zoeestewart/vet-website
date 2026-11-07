import { useEffect, useMemo, useState } from 'react'
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

// The last successful load is kept in the browser so repeat visits render
// straight away while fresh data is fetched in the background. Bump the
// version if the shape of the parsed data changes.
const CACHE_KEY = 'vet-sheet-data-v1'

function readCachedData() {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY))
    return cached?.clinics?.length ? cached : null
  } catch {
    return null
  }
}

function writeCachedData(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data))
  } catch {
    // Storage can be full or blocked (private mode); the site works without it.
  }
}

async function loadSheet(url, name, signal, parse) {
  const response = await fetch(url, { signal })
  if (!response.ok) {
    throw new Error(`${name} spreadsheet returned HTTP ${response.status}.`)
  }
  return parse(await response.text())
}

// Staff problems only affect the team page, so they are kept rather than thrown.
function loadStaffSheet(signal) {
  if (!staffCsvUrl) {
    return Promise.resolve({
      error: 'The staff spreadsheet URL has not been configured.',
    })
  }

  // Errors are kept as plain messages so the result can be cached as JSON.
  return loadSheet(staffCsvUrl, 'Staff', signal, (csv) => ({ csv })).catch(
    (error) => {
      if (error instanceof Error && error.name === 'AbortError') throw error
      return {
        error: error instanceof Error ? error.message : 'An unexpected error occurred.',
      }
    },
  )
}

function getClinicStaff(staffSheet, clinicId) {
  try {
    if (staffSheet.error) throw new Error(staffSheet.error)

    const staff = parseStaffCsv(staffSheet.csv, clinicId)
    if (staff.length === 0) {
      throw new Error(`No staff rows were found for clinic "${clinicId}".`)
    }

    return { staff, staffError: '' }
  } catch (error) {
    return {
      staff: [],
      staffError: `Staff details could not be loaded from the spreadsheet. ${error instanceof Error ? error.message : 'An unexpected error occurred.'}`,
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
  const [data, setData] = useState(readCachedData)
  const [loadError, setLoadError] = useState('')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadData() {
      try {
        const [clinics, serviceGuides, glossaryEntries, staffSheet] =
          await Promise.all([
            loadSheet(clinicsCsvUrl, 'Clinics', controller.signal, parseClinicsCsv),
            loadSheet(guidesCsvUrl, 'Guides', controller.signal, parseGuidesCsv),
            loadSheet(
              glossaryCsvUrl,
              'Glossary',
              controller.signal,
              parseGlossaryCsv,
            ),
            loadStaffSheet(controller.signal),
          ])
        if (controller.signal.aborted) return

        const freshData = { clinics, serviceGuides, glossaryEntries, staffSheet }
        setData(freshData)
        writeCachedData(freshData)
        setLoadError('')
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return

        setLoadError(
          `Website information could not be loaded from Google Sheets. ${error instanceof Error ? error.message : 'An unexpected error occurred.'}`,
        )
      }
    }

    loadData()
    return () => controller.abort()
  }, [attempt])

  const value = useMemo(() => {
    if (!data) return null

    const currentClinic = getCurrentClinic(
      data.clinics,
      window.location.hostname,
      window.location.search,
    )

    const { staffSheet, ...sheets } = data

    return {
      ...sheets,
      ...getClinicStaff(staffSheet, currentClinic.id),
      currentClinic,
      otherClinic: data.clinics.find((clinic) => clinic.id !== currentClinic.id),
    }
  }, [data])

  // A failed background refresh keeps showing the cached data; the error page
  // is only for visitors with nothing to show yet.
  if (loadError && !value) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-12">
        <p
          className="border-l-4 border-amber-600 bg-amber-50 px-4 py-3 text-amber-950"
          role="alert"
        >
          {loadError}
        </p>
        <button
          className="mt-4 rounded-sm bg-[var(--clinic-accent,#e77826)] px-4 py-2 font-semibold text-white"
          onClick={() => {
            setData(null)
            setLoadError('')
            setAttempt((previousAttempt) => previousAttempt + 1)
          }}
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
