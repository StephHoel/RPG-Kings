export function isSameRoute(pathname: string, route: string) {
  const path = pathname
    .replace(process.env.NEXT_PUBLIC_BASE_PATH ?? '', '')
    .replaceAll('/','')
    .split('?')[0]

  const routeClear = route
    .replaceAll('/','')
    .split('?')[0]

  return path === routeClear
}