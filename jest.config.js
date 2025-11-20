export const preset = 'ts-jest'
export const testEnvironment = 'node'
export const testTimeout = 30000
export const transform = {
  '^.+\\.(ts|tsx)$': 'ts-jest'
}
export const testPathIgnorePatterns = ['/node_modules/', '/.next/']
