import { ROUTES } from '@/domain/routes'

export type MenuConfig = {
  key: keyof typeof ROUTES
  label: string
  type?: 'dev'
  requiresSave?: boolean
}
