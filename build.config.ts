import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  rollup: { emitCJS: true },
  // TODO: fix in unbuild
  externals: ['node:url', 'node:path'],
  entries: ['./src/transform'],
})
