export const ROUTES = {
  ROOT: '/',
  AUTH: '/auth',
  SAVES: '/saves',
  SAVE_NEW: '/saves/new',
  GAME: (id: string) => `/game/${id}`,
  PROGRESS: (id: string) => `/progress/${id}`,
  SHEET: (id: string) => `/sheet/${id}`,
  SETTINGS: '/settings',
} as const