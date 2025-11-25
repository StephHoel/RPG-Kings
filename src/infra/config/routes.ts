// Expose BASE for templates or runtime use
export const BASE = '/RPG-Kings'

export const ROUTES = {
  ROOT: '/',
  // AUTH: '/auth',
  SAVES: '/saves',
  SAVE_NEW: '/saves/new',
  GAME: '/game',
  // PROGRESS: '/progress',
  SHEET: '/sheet',
  // SETTINGS: '/settings',
  DEV_SEED: '/dev/seed',
  DEBUG: '/debug',
} as const

export function routeWithSaveId(route: string, id: string) {
  return `${route}?saveId=${id}`
}
