import type { Plugin } from 'vite'
import type { Send2ServerOptions } from './types'
import { upload } from '@send2server/send2server-core'

export function send2server(options: Send2ServerOptions): Plugin {
    return {
        name: 'send2server',
        closeBundle() {
            upload(options.sftpConfig, options.localPath, options.remotePath)
        },

    }
}
