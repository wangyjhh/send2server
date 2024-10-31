import { log } from 'node:console'
import fs from 'fs-extra'
import Client from 'ssh2-sftp-client'

export const upload = async (
    options: {
        host: string
        port: number
        username: string
        password: string
    },
    localPath: string,
    remotePath: string,
) => {
    const sftp = new Client()
    try {
        // 连接到 SFTP 服务器
        await sftp.connect({
            host: options.host,
            port: options.port,
            username: options.username,
            password: options.password,
        })
        log('上传开始')
        // 检查本地路径是否存在
        if (!(await fs.pathExists(localPath))) {
            log('本地路径不存在')
            return
        }
        // 上传文件
        await sftp.uploadDir(localPath, remotePath)
    }
    catch (err: any) {
        console.error('发生错误:', err.message)
    }
    finally {
        // 关闭连接
        await sftp.end()
        log('上传结束')
    }
}
