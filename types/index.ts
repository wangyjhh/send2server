import type { Buffer } from 'node:buffer'

export interface ConnectConfig {
    host?: string
    port?: number
    username?: string
    password?: string
    privateKey?: Buffer | string
}
