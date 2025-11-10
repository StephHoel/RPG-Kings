const BASE = '/RPG-Kings'

export const ROUTES = {
  ROOT: '/',
  AUTH: '/auth',
  SAVES: '/saves',
  SAVE_NEW: '/saves/new',
  // Use query param `?saveId=` so pages can be statically exported
  GAME: (id: string) => `/game?saveId=${id}`,
  PROGRESS: (id: string) => `/progress?saveId=${id}`,
  SHEET: (id: string) => `/sheet?saveId=${id}`,
  SETTINGS: '/settings',

  DEV_SEED: '/dev/seed',
  DEBUG: '/debug',

  // Expose BASE for templates or runtime use
  BASE,
} as const