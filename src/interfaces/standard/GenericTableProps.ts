import { HeaderProps } from './HeaderProps'

export interface GenericTableProps<T> {
  header: HeaderProps<T>[]
  rows: T[]
  rowKey?: (row: T) => string | number
}