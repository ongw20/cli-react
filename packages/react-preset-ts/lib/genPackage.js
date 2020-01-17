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
      '@babel/plugin-transform-runtime': '^7.4.3',
      '@babel/preset-react': '^7.0.0',
      '@types/jest': '^24.0.13',
      '@types/react': '^16.8.14',
      '@types/react-dom': '^16.8.4',
      '@typescript-eslint/eslint-plugin': '^2.0.0',
      '@typescript-eslint/parser': '^1.7.0',
      autoprefixer: '^9.6.0',
      'clean-webpack-plugin': '^2.0.1',
      'cli-react-service': '^0.3.0',
      'copy-webpack-plugin': '^5.0.2',
      'css-loader': '^2.1.1',
      'eslint-plugin-react': '^7.14.3',
      'html-webpack-plugin': '^3.2.0',
      husky: '^4.0.10',
      jest: '^24.7.1',
      less: '^3.10.3',
      'less-loader': '^5.0.0',
      'lint-staged': '^9.5.0',
      'mini-css-extract-plugin': '^0.6.0',
      postcss: '^7.0.26',
      'postcss-loader': '^3.0.0',
      'style-loader': '^0.23.1',
      stylelint: '^10.1.0',
      'stylelint-config-standard': '^18.3.0',
      'stylelint-webpack-plugin': '^0.10.5',
      'ts-jest': '^24.0.2',
      'ts-loader': '^5.4.3',
      typescript: '^3.4.5'
    },
    dependencies: {
      '@babel/runtime': '^7.4.3',
      'core-js': '^3.1.3',
      react: '^16.8.6',
      'react-dom': '^16.8.6'
    },
    'lint-staged': {
      '*.tsx?': [
        'eslint --fix',
        'git add'
      ],
      '*.less': [
        'stylelint --syntax=less --fix',
        'git add'
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
