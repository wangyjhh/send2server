import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
    entries: ['src/index'],
    externals: ['fs-extra'],
    declaration: true,
    clean: true,
})
