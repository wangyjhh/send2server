## Send2Server

### Description
This is Vite Plugin about send the builded files to the server.

### Installation

```bash
# npm
$ npm install vite-plugin-send2server --save-dev
# pnpm
$ pnpm add vite-plugin-send2server -D
```

### Usage
#### 1. Add the plugin to your `vite.config.ts`
```typescript
// vite.config.ts
import { join, resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import send2server from 'vite-plugin-send2server'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        send2server({
            sftpConfig: {
                host: 'xxx.xxx.xxx.xxx',
                port: 22,
                username: 'xxx',
                password: 'xxx',
            },
            localPath: join(resolve(), './dist'),
            remotePath: '/usr/local/nginx/html',
        }),
    ],
})
```

#### 2. Run Build
```bash
# npm
npm run build
# pnpm
pnpm build
```
