import { ROUTES } from '../../src/config/files/routes'

describe('E2E routes should return 200', () => {
  const routes = Object.entries(ROUTES).filter((entry): entry is [string, any] => typeof entry[1] === 'string')
  const base = 'http://localhost:3000'

  for (const [key, route] of routes) {
    test(`${key} (${route}) returns 200`, async () => {
      const url = `${base}${route}`
      const res = await fetch(url)
      expect(res.status).toBe(200)
    })
  }
})
