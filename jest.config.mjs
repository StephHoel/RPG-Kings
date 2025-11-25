export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: 'tsconfig.json',
      },
    ],
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {
    // Corrige imports .js gerados pelo TS (Next 16)
    '^(\\.{1,2}/.*)\\.js$': '$1',

    // Suporte ao alias "@/"
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: [
    '<rootDir>/tests/setup/fake-indexeddb.ts',
    '<rootDir>/tests/setup/silence-logs.ts',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  verbose: true,
  testTimeout: 30000,
}
