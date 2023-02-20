const {defaults: tsjPreset} = require('ts-jest/presets');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.jsx$': 'babel-jest',
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.spec.json',
      },
    ],
  },
  testMatch: ['<rootDir>/src/**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  collectCoverageFrom: ['./src/screens/**/*.tsx', './src/store/**/*.ts'],
  setupFilesAfterEnv: [
    './jest.setup.ts',
    '@testing-library/jest-native/extend-expect',
  ],
  transformIgnorePatterns: [
    `node_modules/(?!(${[
      'react-native-vector-icons',
      'react-native',
      '@react-native',
      '@react-navigation/elements',
    ].join('|')})/)`,
  ],
};
