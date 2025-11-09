import { ROUTES } from './routes'

export const MENUS = [
  { route: (_id: string | null): string => _id ? ROUTES.GAME(_id) : ROUTES.SAVES, label: 'Jogo' },
  { route: (_id: string | null): string => _id ? ROUTES.SHEET(_id) : ROUTES.SAVES, label: 'Ficha' },
  { route: (_id: string | null): string => _id ? ROUTES.PROGRESS(_id) : ROUTES.SAVES, label: 'Progresso' },
  { route: (_id: string | null): string => ROUTES.SAVES, label: 'Saves' },
  { route: (_id: string | null): string => ROUTES.SETTINGS, label: 'Config' },
]