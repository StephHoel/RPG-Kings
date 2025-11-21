import { createContext } from 'react'
import { ActiveSaveState } from './activeSaveState'

export const ActiveSaveContext = createContext<ActiveSaveState | null>(null)
