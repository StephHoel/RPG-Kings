import { createDefaultPreset } from 'ts-jest'

export default {
  ...createDefaultPreset(),
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  testTimeout: 30000,
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        useESM: true,
        extensionsToTreatAsEsm: ['.ts', '.tsx'],
      },
    ],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // corrige imports .js gerados pelo TS
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
