import { HeaderProps } from './header.type'

export interface GenericTableProps<T> {
  header: HeaderProps<T>[]
  rows: T[]
  rowKey?: (row: T) => string | number
}
