module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  setupFilesAfterEnv: [
    'jest-expect-message',
    '<rootDir>/tests/unit/base-test.js',
  ],

  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@test/(.*)$': '<rootDir>/tests/unit/$1',
    'App/(.*)$': '<rootDir>/src/app/$1',
    'Arch/(.*)$': '<rootDir>/src/app/arch/$1',
    'Assets(.*)$': '<rootDir>/src/assets/$1',
    'Domain(.*)$': '<rootDir>/src/domain/$1',
    'Plugins(.*)$': '<rootDir>/src/plugins/$1',
  },
  snapshotSerializers: ['jest-serializer-vue'],
  collectCoverage: true,
  coverageReporters: ['text', 'text-summary', 'lcov', 'html'],
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!**/node_modules/**',
    '!<rootDir>/src/main.js',
    '!<rootDir>/src/plugins/**.js',
    '!<rootDir>/src/router/**.js',
    '!src/App.vue',
    '!src/app/routes.js',
    '!src/main.js',
    '!src/router.js',
  ],
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)',
  ],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
