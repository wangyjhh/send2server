import type { FileEntryWithStats, SFTPWrapper, Client as SSHClient } from 'ssh2'
import type { ConnectConfig } from '../types'
import { log } from 'node:console'
import { Client } from 'ssh2'

export class SftpHandle {
    private _client!: SSHClient
    private _sftp!: SFTPWrapper
    private _config: ConnectConfig
    constructor(config: ConnectConfig) {
        this._config = config
    }

    connect() {
        return new Promise((resolve, reject) => {
            // 初始化 SSH 客户端
            this._client = new Client()
            this._client
                .on('ready', () => {
                    this._client.sftp((_err, _sftp) => {
                        this._sftp = _sftp
                        resolve(null)
                    })
                })
                .on('error', (err) => {
                    reject(err)
                })
                .connect(this._config)
        })
    }

    disconnect() {
        if (!this._client)
            return
        this._client.end()
    }

    readdir(path: string): Promise<FileEntryWithStats[]> {
        return new Promise((resolve, reject) => {
            if (!this._sftp)
                reject(new Error('sftp not ready'))
            this._sftp.readdir(path, (err, files) => {
                if (err)
                    reject(err)
                resolve(files)
            })
        })
    }

    isDirectory(parmas: string): boolean {
        const dirReg = /^d/g
        return !!parmas.match(dirReg)
    }
}
