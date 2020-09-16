module.exports = {
  collectCoverage: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    // we must specify a custom tsconfig for tests because we need the typescript transform
    // to transform jsx into js rather than leaving it jsx such as the next build requires.  you
    // can see this setting in tsconfig.jest.json -> "jsx": "react"
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  setupFilesAfterEnv: ['<rootDir>/src/setuptests.ts'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/build/',
    '/.storybook/',
    '/lib/',
  ],
}
