import { join, resolve } from 'node:path'
import { defineSend2ServerConfig } from '@send2server/send2server-cli'

export default defineSend2ServerConfig({
    sftpConfig: {
        host: '59.110.92.231',
        port: 9322,
        username: 'wyj',
        password: 'huihui',
    },
    localPath: join(resolve(), './dist'),
    remotePath: '/home/wyj/send_test_node',
})
