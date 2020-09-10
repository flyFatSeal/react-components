module.exports = {
  collectCoverage: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setuptests.ts'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/build/',
    '/.storybook/',
    '/lib/',
  ],
}
