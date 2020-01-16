const fs = require('fs-extra')

function getCombinedJson(pkgJson) {
  return {
    ...pkgJson,
    description: 'A React.js project.',
    main: 'src/index.js',
    scripts: {
      dev: 'react-service serve',
      build: 'react-service build',
      test: 'jest --coverage'
    },
    devDependencies: {
      '@babel/plugin-proposal-class-properties': '^7.4.0',
      '@babel/plugin-transform-runtime': '^7.4.3',
      '@babel/preset-react': '^7.0.0',
      autoprefixer: '^9.6.0',
      'babel-eslint': '^10.0.1',
      'clean-webpack-plugin': '^2.0.1',
      'cli-react-service': '^0.3.0',
      'copy-webpack-plugin': '^5.0.2',
      'css-loader': '^2.1.1',
      enzyme: '^3.9.0',
      'enzyme-adapter-react-16': '^1.13.2',
      'eslint-config-standard': '^12.0.0',
      'eslint-plugin-import': '^2.16.0',
      'eslint-plugin-node': '^8.0.1',
      'eslint-plugin-promise': '^4.1.1',
      'eslint-plugin-react': '^7.12.4',
      'eslint-plugin-standard': '^4.0.0',
      'html-webpack-plugin': '^3.2.0',
      jest: '^24.7.1',
      'jest-transform-stub': '^2.0.0',
      'mini-css-extract-plugin': '^0.6.0',
      'node-sass': '^4.11.0',
      'postcss-loader': '^3.0.0',
      'sass-loader': '^7.1.0',
      'style-loader': '^0.23.1',
      stylelint: '^10.1.0',
      'stylelint-config-standard': '^18.3.0',
      'stylelint-webpack-plugin': '^0.10.5'
    },
    dependencies: {
      '@babel/runtime': '^7.4.3',
      'core-js': '^3.1.3',
      react: '^16.8.6',
      'react-dom': '^16.8.6'
    },
    browserslist: [
      '> 1%',
      'last 2 version',
      'not ie < 11'
    ]
  }
}

module.exports = (pkgFile, pkgJson) => {
  fs.outputJSONSync(pkgFile, getCombinedJson(pkgJson), {
    spaces: 2
  })
}
