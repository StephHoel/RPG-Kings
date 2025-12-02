import { ROUTES, routeWithSaveId } from '@/domain/routes'
import { MenuConfig, MenuItem } from '@/domain/types'

const MENU_CONFIG: MenuConfig[] = [
  { key: 'ROOT', label: 'Home' },
  { key: 'GAME', label: 'Jogo', requiresSave: true },
  { key: 'SHEET', label: 'Ficha', requiresSave: true },
  { key: 'SAVES', label: 'Saves' },
  // { key: 'DEV_SEED', label: 'Seed', type: 'dev' },
  { key: 'DEBUG', label: 'Debug', type: 'dev' },
]

export function getMenus(): MenuItem[] {
  return MENU_CONFIG.map((cfg) => {
    const routeFn = (id: string) => {
      const route = ROUTES[cfg.key]

      if (cfg.requiresSave) {
        return id ? routeWithSaveId(route, id) : ''
      }

      return route
    }

    return {
      route: routeFn,
      label: cfg.label,
      type: cfg.type,
    } as MenuItem
  })
}
