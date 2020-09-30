module.exports = {
  globals: {
    'ts-jest': {
      compiler: 'ttypescript',
    },
  },
  setupFiles: [
    '<rootDir>setup.jest.ts',
  ],
  verbose: true,
  testMatch: [
    '**/__tests__/**/*.ts?(x)',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
