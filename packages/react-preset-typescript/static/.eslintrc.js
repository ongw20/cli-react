module.exports = {
  env: {
    jest: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    warnOnUnsupportedTypeScriptVersion: false
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended'
  ],
  plugins: [
    '@typescript-eslint/eslint-plugin'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    '@typescript-eslint/indent': ['error', 2],
    'eol-last': ['error', 'always'],
    'no-unused-vars': ['warn', { 'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': false }],
    'no-console': 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'quotes': ['error', 'single'],
    'space-before-function-paren': ['error', 'never']
  }
}
