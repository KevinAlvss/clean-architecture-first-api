const { defaults: tsjPreset } = require("ts-jest/presets");

module.exports = {
  preset: "@shelf/jest-mongodb",
  transform: tsjPreset.transform,
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  watchPathIgnorePatterns: ["globalConfig"],
};
