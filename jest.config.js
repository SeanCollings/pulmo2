module.exports = {
  preset: 'jest-expo',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)',
  ],
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testTimeout: 10000,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/babel.config.js',
    '!**/jest.setup.js',
  ],
  coveragePathIgnorePatterns: ['jest.config.js', 'metro.config.js'],
  testEnvironment: 'node',
  globalSetup: './global-setup.js',
};
