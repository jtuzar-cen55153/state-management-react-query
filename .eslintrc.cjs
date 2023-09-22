module.exports = {
  extends: ['react-app'],
  env: {
    browser: true,
    node: true,
    jest: true,
    mocha: true,
  },
  ignorePatterns: ['public', '.eslintrc.cjs'],
  plugins: ['prettier', '@tanstack/query'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
