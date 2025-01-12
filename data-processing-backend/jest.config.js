module.exports = {
    "roots": [
      "<rootDir>/src"
    ],
    "testMatch": [
      "**/__tests__/**/*.+(ts|tsx|js)",
      "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    "transform": {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
    testPathIgnorePatterns: ["/node_modules/", "/__tests__/utils/"],
    testEnvironmentOptions: {
      url: `http://localhost:${process.env.PORT}`,
    },
    forceExit: true,
    verbose: true,
  }