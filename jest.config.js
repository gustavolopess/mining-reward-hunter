module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  rootDir: '',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: [
    '/tests/',
    '/node_modules/',
    '/dist/',
    'main.ts',
    '.module.ts'
  ],
  testEnvironment: 'node',
};