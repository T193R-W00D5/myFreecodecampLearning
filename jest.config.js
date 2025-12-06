export default {
  testEnvironment: 'node',
  transform: {},
  // Exclude Playwright tests from Jest
  testPathIgnorePatterns: [
    '/node_modules/',
    '/tests/e2e/',
    '/test-results/',
    '/playwright-report/',
    '/_site/'
  ],
  // Only include __tests__ directory for Jest
  testMatch: [
    '**/__tests__/**/*.(test|spec).js'
  ]
};