export default {
  testEnvironment: "node",
  preset: "ts-jest/presets/default-esm",
  globals: {},
  transform: {
    "^.+\\.(t|j)sx?$": "ts-jest",
  },
  testRegex: "(/tests/.*|\\.(test))\\.(ts|tsx|js)$",
  moduleFileExtensions: ["ts", "js", "json"],
};
