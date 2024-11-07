## Vite-Plugin-Send2Server

### Description
This is tools about send the builded files to the server.

### Installation

```bash
# npm
$ npm install send2server --save-dev
# pnpm
$ pnpm add send2server -D
```

### Usage

#### 1. Create a `send2server.config.ts` file in the root directory of your project.
```typescript
// send2server.config.ts
import { join, resolve } from 'node:path'
import { defineSend2ServerConfig } from 'send2server'

export default defineSend2ServerConfig({
    sftpConfig: {
        host: 'xxx.xxx.xxx.xxx',
        port: 22,
        username: 'xxx',
        password: 'xxx',
    },
    localPath: join(resolve(), './dist'),
    remotePath: '/usr/local/nginx/html',
})
```

#### 2. Add the following script to your `package.json` file.
```json
{
    "scripts": {
        "send2server": "send2server",
        "build": "unbuild && pnpm send2server"
    }
}
```

#### 3. Run the build command.
```bash
# npm
$ npm run build
# pnpm
$ pnpm build
```
