import { join, resolve } from 'node:path'
import { my_upload } from './my_upload'
import { upload } from './upload'

const main = async () => {
    const localPath = join(resolve(), './example/vue-app-example/dist')
    const remotePath = '/home/wyj/send_test'
    my_upload({ localPath, remotePath })
}

main()
