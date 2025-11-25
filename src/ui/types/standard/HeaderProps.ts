import { ReactNode } from 'react'

export interface HeaderProps<T> {
  key: string
  label: ReactNode
  onHeaderClick?: () => void
  // eslint-disable-next-line no-unused-vars
  render?: (row: T) => ReactNode
}
