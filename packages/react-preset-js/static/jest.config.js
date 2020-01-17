module.exports = {
  setupFilesAfterEnv: ['./setupTests.js'],
  moduleFileExtensions: [
    'js',
    'jsx',
    'json'
  ],
  transform: {
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest'
  },
  transformIgnorePatterns: [
    '/node_modules/'
  ]
}
