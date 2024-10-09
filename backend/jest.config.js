module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: 'ts-jest',
  testEnvironment: "node",
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transform: {
    "^.+\\.(ts|tsx)$": ['ts-jest', {
      tsconfig: 'tsconfig.json',  
    }]
  },
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
};
