import { join, resolve } from 'node:path'
import { upload } from './upload'

const main = async () => {
    const localPath = join(resolve(), './example/vue-app-example/dist')
    const remotePath = '/home/wyj/send_test'
    upload({ localPath, remotePath })
}

main()
