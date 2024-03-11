module.exports = {
  // A preset that sets up Jest for React projects
  preset: "react-testing-library",
  // The test environment to use ('jsdom' is the default)
  testEnvironment: "jsdom",
  // A list of file extensions Jest should process as modules
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  // Configure test file transforms for using ES6 features
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  // A map from regular expressions to paths to transformers
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  // A list of reporter names that Jest uses
  moduleNameMapper: {
    // Look for tests in a different directory or with a different extension
    "\\.(test|spec).(js|jsx)$": "<rootDir>/__tests__/$1",
  },
  watch: false,
};
