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
  testMatch: ['**/*.spec.ts'],
  moduleNameMapper: {
    // alias src/(.*) not work
    // 从上到下优先匹配
    '@/test/(.*)': '<rootDir>/test/$1',
    '@/(.*)': '<rootDir>/src/$1'
  },
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
      diagnostics: false
    }
  }
}
