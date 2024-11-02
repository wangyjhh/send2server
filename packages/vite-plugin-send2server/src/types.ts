export interface SFTPConfig {
    host: string
    port: number
    username: string
    password: string
}

export interface Send2ServerOptions {
    sftpConfig: SFTPConfig
    localPath: string
    remotePath: string

}
