import { useContext } from 'react'
import { ActiveSaveContext } from './activeSaveContext'

export function useActiveSaveContext() {
  const ctx = useContext(ActiveSaveContext)

  if (!ctx) throw new Error('useActiveSaveContext must be used within ActiveSaveContext.Provider')

  return ctx
}