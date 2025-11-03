// Pequeno wrapper para armazenamento local (Dixie se disponível, fallback para localStorage)
import type { PlayerState } from './types/scenes'

const SAVE_KEY_PREFIX = 'rpg-kings:save:'

function storageGet(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch (e) {
    console.error('storage.get error', e)
    return null
  }
}

function storageSet(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch (e) {
    console.error('storage.set error', e)
  }
}

export async function loadSave(saveId: string): Promise<PlayerState | null> {
  const raw = storageGet(SAVE_KEY_PREFIX + saveId)
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw)
    return migrateSave(parsed)
  } catch (e) {
    console.error('loadSave parse error', e)
    return null
  }
}

export async function saveState(saveId: string, state: PlayerState): Promise<void> {
  try {
    storageSet(SAVE_KEY_PREFIX + saveId, JSON.stringify(state))
  } catch (e) {
    console.error('saveState error', e)
  }
}

export function migrateSave(raw: any): PlayerState {
  // Simple migration strategy: ensure schemaVersion exists and apply trivial upgrades
  const currentVersion = 1
  if (!raw.schemaVersion) raw.schemaVersion = 0
  let state = raw as PlayerState
  if (state.schemaVersion === 0) {
    // Example migration from v0 -> v1
    state.schemaVersion = 1
    state.flags = state.flags || {}
    state.resources = state.resources || {}
  }
  // Future migrations would be applied here
  return state
}

export default { loadSave, saveState, migrateSave }
