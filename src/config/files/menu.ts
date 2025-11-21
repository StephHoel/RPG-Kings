/* eslint-disable no-unused-vars */
import { ROUTES, routeWithSaveId } from './routes'

export const MENUS = [
  {
    route: (_id: string | null): string => ROUTES.ROOT,
    label: 'Home',
  },
  {
    route: (_id: string | null): string => (_id ? routeWithSaveId(ROUTES.GAME, _id) : ''),
    label: 'Jogo',
  },
  {
    route: (_id: string | null): string => (_id ? routeWithSaveId(ROUTES.SHEET, _id) : ''),
    label: 'Ficha',
  },
  {
    route: (_id: string | null): string => (_id ? routeWithSaveId(ROUTES.PROGRESS, _id) : ''),
    label: 'Progresso',
  },
  {
    route: (_id: string | null): string => ROUTES.SAVES,
    label: 'Saves',
  },
  // {
  //   route: (_id: string | null): string => ROUTES.SETTINGS,
  //   label: 'Config'
  // },
  {
    route: (_id: string | null): string => ROUTES.DEV_SEED,
    label: 'Seed',
    type: 'dev',
  },
  {
    route: (_id: string | null): string => ROUTES.DEBUG,
    label: 'Debug',
    type: 'dev',
  },
]
