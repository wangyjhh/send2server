import { log } from 'node:console'
import { join, parse } from 'node:path'
import fs from 'fs-extra'
import ProgressBar from 'progress'
import Client from 'ssh2-sftp-client'

const task_log: any[] = []

const formatPath = (platform: 'windows' | 'linux', remotePath: string) => {
    if (platform === 'windows') {
        return remotePath.replace(/\/|\\/g, '\\\\')
    }
    else {
        return remotePath.replace(/\\/g, '/')
    }
}

const getUploadDir = (localPath: string, remotePath: string, remotePlatform?: 'linux' | 'windows') => {
    if (!remotePlatform) {
        remotePlatform = 'linux'
    }
    const rootName = parse(localPath).name

    const list = fs.readdirSync(localPath, { withFileTypes: true, recursive: true })
        .map((item) => {
            const relativePath = rootName === parse(item.path).name ? join(parse(item.path).name, item.name) : join(rootName, parse(item.path).name, item.name)
            const absoluteRemotePath = formatPath(remotePlatform, join(remotePath, relativePath))
            const absoluteLocalpath = rootName === parse(item.path).name ? join(localPath, item.name) : join(localPath, parse(item.path).name, item.name)
            return {
                name: item.name,
                absoluteRemotePath,
                absoluteLocalpath,
                isDir: item.isDirectory(),
            }
        })
    return {
        root: {
            name: rootName,
            absoluteRemotePath: formatPath(remotePlatform, join(remotePath, rootName)),
            absoluteLocalpath: localPath,
            isDir: true,
        },
        directories: list.filter(item => item.isDir),
        files: list.filter(item => !item.isDir),
    }
}

const createRemoteDir = async (sftp: Client, dirPath: string) => {
    if (!(await sftp.exists(dirPath))) {
        await sftp.mkdir(dirPath, true)
    }
}

const uploadFile = async (sftp: Client, localPath: string, remotePath: string) => {
    const start = Date.now()
    await sftp.fastPut(localPath, remotePath, {
        step(total_transferred, chunk, total) {
            // 创建进度条
            const bar = new ProgressBar(`${parse(localPath).base} [:bar] :percent :myetas`, {
                complete: '=',
                incomplete: ' ',
                width: 20,
                total,
            })
            bar.tick(total_transferred, {
                myeta: ((Date.now() - start) / 1000).toFixed(2),
            })
        },
    })
}

export const my_upload = async (
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
        log('=============上传开始=============')
        // 检查本地路径是否存在
        if (!(await fs.pathExists(localPath))) {
            log('本地路径不存在')
            return
        }
        // 获取待上传目录信息
        const uploadDirInfo = getUploadDir(localPath, remotePath)
        // 创建新建远程目录任务数组
        await createRemoteDir(sftp, uploadDirInfo.root.absoluteRemotePath)
        const dirCreateTask = uploadDirInfo.directories.map((dir) => {
            return createRemoteDir(sftp, dir.absoluteRemotePath)
        })
        // 批量新建目录
        await Promise.all(dirCreateTask)

        // 创建上传文件任务数组
        const filesUploadTask = uploadDirInfo.files.map((file) => {
            return uploadFile(sftp, file.absoluteLocalpath, file.absoluteRemotePath)
        })
        // 批量上传文件
        await Promise.all(filesUploadTask)
    }
    catch (err: any) {
        console.error('发生错误:', err.message)
    }
    finally {
        // 打印日志
        task_log.forEach((l) => {
            log(l)
        })
        // 关闭连接
        await sftp.end()
        log('=============上传结束=============')
    }
}
