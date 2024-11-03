import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
    entries: ['src/index', 'src/cli'],
    externals: ['fs-extra'],
    declaration: true,
    clean: true,
})
