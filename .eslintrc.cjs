module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  ignorePatterns: ['node_modules/**/*', 'src/**/*.css'],
  extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['simple-import-sort', 'eslint-plugin-react', 'unused-imports'],
  rules: {
    'unused-imports/no-unused-imports': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/no-unknown-property': 'off',
    'react/jsx-uses-vars': 'error',
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        enableDangerousAutofixThisMayCauseInfiniteLoops: true,
      },
    ],
    'object-shorthand': ['error', 'always'],
    'no-undef': 'error',
    'react/prop-types': 'off',
    'no-console': 'warn',
    'react/display-name': ['error', { ignoreTranspilerName: true }],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
}
