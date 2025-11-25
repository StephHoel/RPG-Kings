import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import reactPlugin from 'eslint-plugin-react'

export default [
  { ignores: ['node_modules/**', '.next/**', 'public/**', 'coverage/**'] },
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        describe: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        jest: 'readonly',
      },
    },
    plugins: { '@typescript-eslint': tsPlugin, react: reactPlugin },
    settings: { react: { version: 'detect' } },
    rules: {
      // Basic rules; add more if you want stricter checks
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],
      'no-console': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
]
