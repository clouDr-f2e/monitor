/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

export default {
  collectCoverage: true,
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  moduleFileExtensions: ['js', 'ts'],
  coveragePathIgnorePatterns: ['/src/wx-mini', '/src/React', '/src/Vue'],
  // testMatch: ['**/is.spec.ts'],
  testMatch: ['**/*.spec.ts'],
  moduleNameMapper: {
    // alias src/(.*) not work
    // 从上到下优先匹配
    '@/test/(.*)': '<rootDir>/test/$1',
    '@zyf2e/monitor-(.*)': '<rootDir>/packages/$1/src/index'
  },
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
      diagnostics: false
    }
  }
}
