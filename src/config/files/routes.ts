// Expose BASE for templates or runtime use
export const BASE = '/RPG-Kings'

export const ROUTES = {
  ROOT: '/',
  AUTH: '/auth',
  SAVES: '/saves',
  SAVE_NEW: '/saves/new',

  // Use query param `?saveId=` so pages can be statically exported
  // GAME: (id: string) => `/game?saveId=${id}`,
  // PROGRESS: (id: string) => `/progress?saveId=${id}`,
  // SHEET: (id: string) => `/sheet?saveId=${id}`,
  
  GAME: '/game',
  PROGRESS: '/progress',
  SHEET: '/sheet',

  SETTINGS: '/settings',

  DEV_SEED: '/dev/seed',
  DEBUG: '/debug',
} as const

export function routeWithSaveId(route: string, id:string) {
  return `${route}?saveId=${id}`
}