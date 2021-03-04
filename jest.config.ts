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
  testMatch: ['**/*.test.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
      diagnostics: false
    }
  },
  moduleNameMapper: {
    // alias src/(.*) not work
    // 从上到下优先匹配
    '@/test/(.*)': '<rootDir>/test/$1',
    '@mito/(.*)': '<rootDir>/packages/$1/src/index'
  },
  globalSetup: './test/config/setup.js',
  globalTeardown: './test/config/teardown.js',
  testEnvironment: './test/config/puppeteerEnvironment.js'
}
