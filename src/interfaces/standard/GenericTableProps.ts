import { HeaderProps } from './HeaderProps'

export interface GenericTableProps<T> {
  header: HeaderProps<T>[]
  rows: T[]
  // eslint-disable-next-line no-unused-vars
  rowKey?: (row: T) => string | number
}