import tsParser from '@typescript-eslint/parser'
import eslintPluginNext from 'eslint-config-next'
const config = [
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    ignores: ['node_modules', 'old'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2024,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        project: ['./tsconfig.json'],
      },
    },
    // Note: do not re-declare plugins here to avoid conflicts with extended configs
    rules: {
      // === Estilo geral ===
      semi: ['error', 'never'],
      quotes: ['error', 'single', { avoidEscape: true }],
      indent: ['error', 2, { SwitchCase: 1 }],
      'no-trailing-spaces': 'error',

      // === Espaçamento ===
      'space-infix-ops': ['error', { int32Hint: false }],
      'keyword-spacing': ['error', { before: true, after: true }],
      'space-before-blocks': ['error', 'always'],
      'semi-spacing': ['error', { before: false, after: true }],
      'space-before-function-paren': ['error', 'never'],
      'space-in-parens': ['error', 'never'],
      'space-unary-ops': ['error', { words: true, nonwords: false }],

      // === TypeScript ===
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // === Outras boas práticas ===
      eqeqeq: ['error', 'always'],
      curly: ['error', 'multi-line'],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'no-children-props': 'off',
      'space-before-function-paren': 'off',
    },
  },

  ...eslintPluginNext,
]

export default config
