#!/usr/bin/env node
const path = require('path')
const fs = require('fs-extra')
const { genPackage, renderFile } = require('../lib')

function genProj() {
  const cwd = process.cwd()
  // `node_modules` in the path means user to install.
  if (!/[/\\]node_modules[/\\]/.test(cwd)) return
  const root = path.resolve(cwd, '../../')
  const pkgFile = path.join(root, 'package.json')
  const pkgJson = require(pkgFile)
  genPackage(pkgFile, pkgJson)
  fs.copySync(path.join(cwd, 'static'), root)
  fs.copySync(path.join(cwd, 'templates'), root, {
    filter: (src, dest) => {
      if (!fs.statSync(src).isDirectory()) {
        renderFile(src, dest, { name: pkgJson.name })
        return false
      }
      return true
    }
  })
}

genProj()
