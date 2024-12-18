import { join, resolve } from 'node:path'
import send2server from '@send2server/vite-plugin-send2server'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        send2server({
            sftpConfig: {
                host: '59.110.92.231',
                port: 9322,
                username: 'wyj',
                password: 'huihui',
            },
            localPath: join(resolve(), './dist'),
            remotePath: '/home/wyj/send_test',
        }),
    ],
})
