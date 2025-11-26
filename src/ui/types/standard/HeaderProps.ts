import { ReactNode } from 'react'

export interface HeaderProps<T> {
  key: string
  label: ReactNode
  onHeaderClick?: () => void
   
  render?: (row: T) => ReactNode
}
