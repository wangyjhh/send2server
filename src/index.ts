import { join, resolve } from 'node:path'
import { my_upload } from './my_upload'
import { upload } from './upload'

const main = async () => {
    const localPath = join(resolve(), './example/vue-app-example/dist')
    const remotePath = '/home/wyj/send_test'
    my_upload(
        {
            host: '59.110.92.231',
            port: 9322,
            username: 'wyj',
            password: 'huihui',
        },
        localPath,
        remotePath,
    )
}

main()
