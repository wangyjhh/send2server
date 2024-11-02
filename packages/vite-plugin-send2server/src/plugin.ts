import type { Plugin } from 'vite'
import type { Send2ServerOptions } from './types'
import { log } from 'node:console'

export function send2server(options: Send2ServerOptions): Plugin {
    let config: any
    log(options)
    return {
        name: 'send2server',
        configResolved(resolvedConfig) {
            // 存储最终解析的配置
            config = resolvedConfig
            log(config)
        },

    }
}
