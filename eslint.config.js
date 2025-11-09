import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

export default [
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    ignores: ['node_modules'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2024,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        project: ['./tsconfig.json']
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin
    },
    // start with recommended TypeScript rules, then override specifics
    rules: {
      // stylistic
      'semi': ['error', 'never'],
      'quotes': ['error', 'single', { avoidEscape: true }],

      // prefer TS version of no-unused-vars
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      // accessibility to relax in some cases
      '@typescript-eslint/explicit-module-boundary-types': 'off'
    }
  }
]
