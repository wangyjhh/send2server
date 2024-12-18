import type { Send2ServerConfigOptions } from './types'
import { log } from 'node:console'
import { existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { cwd } from 'node:process'
import { Command } from 'commander'
import { createJiti } from 'jiti'
import { upload } from 'send2server-core'

const program = new Command()

const supportedConfigFiles = [
    'send2server.config.ts',
    'send2server.config.js',
    'send2server.config.mjs',
]

const existingConfigFiles = supportedConfigFiles.filter(file => existsSync(join(cwd(), file)))
program.name('send2server').action(async () => {
    if (existingConfigFiles.length === 0) {
        log('No config file found')
    }
    else {
        const jiti = createJiti(resolve(cwd(), '.'))
        const config: Send2ServerConfigOptions = (await jiti.import('./send2server.config'))
        upload(config.sftpConfig, config.localPath, config.remotePath)
    }
})

program.parse()
