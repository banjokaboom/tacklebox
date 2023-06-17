module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:react/recommended',
    'next',
    'next/core-web-vitals',
    'plugin:jsx-a11y/strict',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['json-format', 'eslint-plugin-react', 'jsx-a11y'],
  root: true,
  rules: {},
}
