import { ROUTES } from './routes'

export const MENUS = [
  { route: (id: string | null): string => id ? ROUTES.GAME(id) : ROUTES.SAVES, label: 'Jogo' },
  { route: (id: string | null): string => id ? ROUTES.SHEET(id) : ROUTES.SAVES, label: 'Ficha' },
  { route: (id: string | null): string => id ? ROUTES.PROGRESS(id) : ROUTES.SAVES, label: 'Progresso' },
  { route: (id: string | null): string => ROUTES.SAVES, label: 'Saves' },
  { route: (id: string | null): string => ROUTES.SETTINGS, label: 'Config' },
]