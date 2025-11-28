export type MenuItem = {
  route: (id: string | undefined) => string
  label: string
  type?: 'dev'
}
