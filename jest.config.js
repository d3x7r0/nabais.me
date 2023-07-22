module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  testPathIgnorePatterns: [],
  coverageReporters: ['cobertura', 'lcov', 'text-summary'],
  setupFiles: [
    'dotenv-flow/config',
    '<rootDir>/tests/setupTests.js',
  ],
  moduleNameMapper: {
    '^react$': 'preact/compat',
    '^react-dom/test-utils$': 'preact/test-utils',
    '^react-dom$': 'preact/compat',
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
  },
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
}
