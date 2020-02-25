#!/usr/bin/env node
const path = require('path')
const fs = require('fs-extra')
const { genPackage, renderFile } = require('../lib')

function genProj() {
  if (!process.env.CONTEXT) return
  const root = process.env.CONTEXT
  const pkgFile = path.join(root, 'package.json')
  const pkgJson = require(pkgFile)
  genPackage(pkgFile, pkgJson)

  const cwd = process.cwd()
  fs.copySync(path.join(cwd, 'static'), root)
  fs.copySync(path.join(cwd, 'templates'), root, {
    filter: (src, dest) => {
      if (!fs.statSync(src).isDirectory()) {
        renderFile(src, dest, { name: pkgJson.name })
        return false
      }
      return true
    },
  })
}

genProj()
