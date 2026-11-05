import { useContext } from 'react'
import { SheetDataContext } from '../context/sheetDataContext.js'

export default function useSheetData() {
  const value = useContext(SheetDataContext)

  if (!value) {
    throw new Error('useSheetData must be used within a SheetDataProvider.')
  }

  return value
}
