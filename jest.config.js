module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
      '\\.css$': '<rootDir>/__mocks__/styleMock.js',
      '^@/(.*)$': '<rootDir>/src/$1',       
    },
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageReporters: ["text", "lcov"],
    coveragePathIgnorePatterns: [
      "/node_modules/",
      "/__tests__/"
    ],
  };
  