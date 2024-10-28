import { log } from 'node:console'
import { SftpHandle } from './sftp'

const main = async () => {
    const sftphandle = new SftpHandle({
        host: '10.48.158.26',
        port: 22,
        username: 'wyj',
        password: 'huihui',
    })
    await sftphandle.connect()
    const files = await sftphandle.readdir('/home/wyj')
    log(files.map((file) => {
        return {
            name: file.filename,
            longname: file.longname,
            type: sftphandle.isDirectory(file.longname.split(' ')[0]),
            attrs: file.attrs,

        }
    }))

    sftphandle.disconnect()
}

main()
