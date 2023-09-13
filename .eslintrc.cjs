module.exports = {
  extends: ['react-app'],
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
