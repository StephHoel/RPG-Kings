/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 30000,
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: [
    '<rootDir>/tests/setup/fake-indexeddb.ts',
    '<rootDir>/tests/setup/silence-logs.ts',
  ],
  verbose: true,
  testRunner: 'jest-circus/runner',
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
}
