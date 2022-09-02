import type { Plugin } from 'rollup'
import MagicString from 'magic-string'

interface NitroTransformPluginOptions {
  sourcemap?: boolean
  cssContext: { value: string }
}

export const NitroTransformPlugin = (options: NitroTransformPluginOptions): Plugin => ({
  name: 'nuxt-font-metrics-transform-nitro',
  transform(code, source) {
    if (!code.includes('__INLINED_CSS__')) return

    const s = new MagicString(code)
    s.replace('__INLINED_CSS__', `\` ${options.cssContext.value.replace(/\s+/g, ' ')}\``)

    return {
      code: s.toString(),
      map: options.sourcemap ? s.generateMap({ source, includeContent: true }) : undefined,
    }
  },
})
