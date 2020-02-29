module.exports = {
  rootDir: '../',
  roots: ['<rootDir>/src/'],
  setupFilesAfterEnv: ['<rootDir>/jest/setupTests.js'],
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/jest/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/jest/__mocks__/styleMock.js',
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/',
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
  collectCoverage: false,
}
