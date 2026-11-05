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
      error: new Error('The staff spreadsheet URL has not been configured.'),
    })
  }

  return loadSheet(staffCsvUrl, 'Staff', signal, (csv) => ({ csv })).catch(
    (error) => ({ error }),
  )
}

function getClinicStaff(staffSheet, clinicId) {
  try {
    if (staffSheet.error) throw staffSheet.error

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

export function SheetDataProvider({ children }) {
  const [data, setData] = useState(null)
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

        setData({ clinics, serviceGuides, glossaryEntries, staffSheet })
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

  if (loadError) {
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

  if (!value) {
    return (
      <p className="px-5 py-12 text-center text-[#6b655f]" role="status">
        Loading clinic and guide information
      </p>
    )
  }

  return (
    <SheetDataContext.Provider value={value}>
      {children}
    </SheetDataContext.Provider>
  )
}
