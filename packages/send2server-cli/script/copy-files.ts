import { log } from 'node:console'
import { join, resolve } from 'node:path'
import fs from 'fs-extra'

const outputDir = './out'
const filesToCopy = ['README.md', 'LICENSE', 'package.json']

filesToCopy.forEach((file) => {
    const sourcePath = join(resolve(), file)
    const destPath = join(resolve(), outputDir, file)
    fs.copyFileSync(sourcePath, destPath)
})

const pkg = JSON.parse(fs.readFileSync(join(resolve(), outputDir, 'package.json'), 'utf-8'))
pkg.name = 'send2server'
pkg.main = pkg.main.replace('out/', '')
pkg.module = pkg.module.replace('out/', '')
pkg.types = pkg.types.replace('out/', '')
pkg.bin.send2server = pkg.bin.send2server.replace('out/', '')
fs.writeJSONSync(join(resolve(), outputDir, 'package.json'), pkg, { spaces: 4 })
log('Files copied successfully')
