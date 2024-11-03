import type { Send2ServerConfigOptions } from './types'
import { log } from 'node:console'
import { join } from 'node:path'
import { cwd } from 'node:process'
import { upload } from '@send2server/send2server-core'
import { Command } from 'commander'
import fs from 'fs-extra'

const program = new Command()

const supportedConfigFiles = [
    'send2server.config.ts',
    'send2server.config.js',
    'send2server.config.mjs',
]

const existingConfigFiles = supportedConfigFiles.filter(file => fs.existsSync(join(cwd(), file)))

program.name('send2server').action(async () => {
    if (existingConfigFiles.length === 0) {
        log('No config file found')
    }
    else {
        const config: Send2ServerConfigOptions = await import(join(cwd(), existingConfigFiles[0]))
        await upload(config.sftpConfig, config.localPath, config.remotePath)
    }
})

program.parse()
