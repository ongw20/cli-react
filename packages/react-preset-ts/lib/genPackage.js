const fs = require('fs-extra')

function getCombinedJson(pkgJson) {
  return {
    ...pkgJson,
    description: 'A React.js project.',
    main: 'src/index.tsx',
    scripts: {
      dev: 'react-service serve',
      build: 'react-service build',
      test: 'jest --coverage'
    },
    devDependencies: {
      '@babel/core': '^7.8.4',
      '@babel/plugin-transform-runtime': '^7.8.3',
      '@babel/preset-env': '^7.8.4',
      '@babel/preset-react': '^7.8.3',
      '@types/jest': '^25.1.2',
      '@types/react': '^16.9.19',
      '@types/react-dom': '^16.9.5',
      '@typescript-eslint/eslint-plugin': '^2.19.2',
      '@typescript-eslint/parser': '^2.19.2',
      autoprefixer: '^9.7.4',
      'babel-loader': '^8.0.6',
      'clean-webpack-plugin': '^3.0.0',
      'cli-react-service': '^0.6.3',
      'copy-webpack-plugin': '^5.1.1',
      'css-loader': '^3.4.2',
      eslint: '^6.8.0',
      'eslint-plugin-react': '^7.18.3',
      'html-webpack-plugin': '^3.2.0',
      husky: '^4.2.3',
      jest: '^25.1.0',
      less: '^3.11.1',
      'less-loader': '^5.0.0',
      'lint-staged': '^10.0.7',
      'mini-css-extract-plugin': '^0.9.0',
      'postcss-loader': '^3.0.0',
      'style-loader': '^1.1.3',
      stylelint: '^13.2.0',
      'stylelint-config-standard': '^20.0.0',
      'ts-jest': '^25.2.0',
      'ts-loader': '^6.2.1',
      typescript: '^3.7.5'
    },
    dependencies: {
      '@babel/runtime': '^7.8.4',
      'core-js': '^3.6.4',
      react: '^16.12.0',
      'react-dom': '^16.12.0'
    },
    husky: {
      hooks: {
        'pre-commit': 'lint-staged'
      }
    },
    'lint-staged': {
      '*.ts?(x)': [
        'eslint --fix'
      ],
      '*.less': [
        'stylelint --syntax=less --fix'
      ]
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
