import { createUnplugin } from 'unplugin'
import { createRegExp, exactly, charIn, charNotIn, whitespace } from 'magic-regexp'
import MagicString from 'magic-string'
import { generateFontFace, parseFontFace, generateOverrideName } from './css'
import { getMetricsForFamily, readMetrics } from './metrics'

interface FontMetricsTransformPluginOptions {
  css: { value: string }
  fallbacks: string[]
  resolvePath?: (path: string) => string | URL
}

export const FontMetricsTransformPlugin = createUnplugin(
  (options: FontMetricsTransformPluginOptions) => {
    options.css.value = ''
    return {
      name: 'nuxt-font-metrics-transform',
      enforce: 'pre',
      transformInclude (id) {
        return id.endsWith('.css')
      },
      async transform (code, id) {
        const s = new MagicString(code)
        const faceRanges: [start: number, end: number][] = []

        for (const match of code.matchAll(FONT_FACE_RE)) {
          if (match.index === undefined) continue

          faceRanges.push([match.index, match.index + match[0].length])

          const { family, source } = parseFontFace(match[0])
          if (!family) continue

          const metrics = (await getMetricsForFamily(family)) ||
            (source ? await readMetrics(options.resolvePath ? options.resolvePath(source) : source).catch(() => null) : null)

          if (metrics) {
            const fontFace = generateFontFace(metrics, {
              name: generateOverrideName(family),
              fallbacks: options.fallbacks,
            })
            options.css.value += fontFace
            s.appendLeft(match.index, fontFace)
          }
        }

        for (const match of code.matchAll(FONT_FAMILY_RE)) {
          const { index } = match
          if (index === undefined) continue

          // Skip font-family definitions _within_ @font-face blocks
          if (faceRanges.some(([start, end]) => index > start && index < end)) continue
          const families = match[0].split(',').map(f => f.trim())

          s.overwrite(
            index,
            index + match[0].length,
            ' ' + [families[0], `"${generateOverrideName(families[0])}"`, ...families.slice(1)].join(', ')
          )
        }

        if (s.hasChanged()) {
          return {
            code: s.toString(),
            map: s.generateMap({ source: id, includeContent: true }),
          }
        }
      },
    }
  }
)

const FONT_FACE_RE = createRegExp(
  exactly('@font-face')
    .and(whitespace.times.any())
    .and('{')
    .and(charNotIn('}').times.any())
    .and('}'),
  ['g']
)

const FONT_FAMILY_RE = createRegExp(
  charNotIn(';}')
    .times.any()
    .as('family')
    .after(exactly('font-family:').and(whitespace.times.any()))
    .before(charIn(';}').or(exactly('').at.lineEnd())),
  ['g']
)
