export type MenuItem = {
  route: (id: string | null) => string
  label: string
  type?: 'dev'
}
