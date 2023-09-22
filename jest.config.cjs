module.exports = {
  verbose: true,
  collectCoverage: true,
  testEnvironment: 'jsdom',
  collectCoverageFrom: ['./src/**', '!./src/**/__**/**', '!**/?(*.)+(spec|test).[jt]s?(x)'],
  setupFilesAfterEnv: ['<rootDir>/setup-tests.ts'],
};
