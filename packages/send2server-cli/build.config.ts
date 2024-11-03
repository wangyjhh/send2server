import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig([{
    entries: ['src/index'],
    declaration: true,
    clean: true,
}, {
    entries: ['src/cli'],
    declaration: true,
    clean: true,
}])
