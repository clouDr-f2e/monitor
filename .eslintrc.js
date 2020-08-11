module.exports = {
  parser: '@typescript-eslint/parser', //定义ESLint的解析器
  extends: ['plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint', 'html'],
  env: {
    browser: true,
    node: true
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0
  }
}
