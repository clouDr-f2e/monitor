/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

export default {
  collectCoverage: false,
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  moduleFileExtensions: ['js', 'ts'],
  testMatch: ['**/*.test.ts', '**/*.spec.ts'],
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
      diagnostics: false
    }
  },
  globalSetup: './test/setup.js',
  globalTeardown: './test/teardown.js',
  // testEnvironment: 'node',
  testEnvironment: './test/puppeteerEnvironment.js'
}
