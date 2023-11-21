import { pathToFileURL } from 'node:url'
import { isAbsolute } from 'node:path'
import {
  addTemplate,
  addVitePlugin,
  addPluginTemplate,
  addWebpackPlugin,
  resolveAlias,
  defineNuxtModule,
  useLogger,
} from '@nuxt/kit'
import { join } from 'pathe'
import { hasProtocol } from 'ufo'
import { NitroTransformPlugin } from './nitro-plugin'
import {
  FontaineTransform,
  generateFontFace,
  generateFallbackName,
  getMetricsForFamily,
  readMetrics,
} from 'fontaine'

interface CustomFont {
  /** The font family name. This will be used to generate the fallback name and also to load cached metrics, if possible. */
  family: string
  /** A file or web URL to inspect for font metrics. */
  src?: string
  /** If you want to customise the overridden name. In most cases it should not be overridden. */
  fallbackName?: string
  /** If you want to customise the fallbacks on a per-font basis. */
  fallbacks?: string[]
  /** If you want to customise font directory. Default is Nuxt public directory. */
  root?: string
}

export interface ModuleOptions {
  /** Set to `false` to disable automatic injection of fallbacks. */
  inject: boolean
  /** Set to `false` to disable inlining of font-face rules. */
  inline: boolean
  /** An array of local fonts to display as a fallback. */
  fallbacks: string[]
  /** Fonts to generate fallback declarations for. This is only necessary if you do not have `@font-face` declarations for them in your CSS. */
  fonts: Array<string | CustomFont>
  /** If you want to customise directory for all fonts. Default is Nuxt public directory. */
  root?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    configKey: 'fontMetrics',
    name: '@nuxtjs/fontaine',
    compatibility: {
      nuxt: '^3.0.0-rc.6',
    },
  },
  defaults: nuxt => ({
    inject: true,
    inline: nuxt.options.ssr,
    fallbacks: ['BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans'],
    fonts: [],
  }),
  async setup(options, nuxt) {
    // Skip when preparing
    if (nuxt.options._prepare) return

    // Allow fully overriding default fallbacks
    if ((nuxt.options as any).fontMetrics?.fallbacks) {
      options.fallbacks = (nuxt.options as any).fontMetrics?.fallbacks
    }

    const logger = useLogger('@nuxtjs/fontaine')

    const css = (async () => {
      let css = ''
      for (const font of options.fonts) {
        const {
          family,
          src,
          fallbackName,
          fallbacks,
          root: fontRoot,
        } = typeof font === 'string' ? ({ family: font } as CustomFont) : font

        let metrics = await getMetricsForFamily(family)

        if (!metrics && src && !hasProtocol(src)) {
          const file = join(
            nuxt.options.srcDir,
            fontRoot ?? options.root ?? nuxt.options.dir.public,
            src
          )
          metrics = await readMetrics(pathToFileURL(file))
        }

        if (!metrics) {
          logger.warn('Could not find metrics for font', family)
          continue
        }

        for (const font of fallbacks || options.fallbacks) {
          css += generateFontFace(metrics, {
            name: fallbackName || generateFallbackName(family),
            font,
            metrics: (await getMetricsForFamily(font))!,
          })
        }
      }
      return css
    })()

    const cssContext = { value: '' }

    if (options.inject) {
      const resolvePath = (id: string) => {
        if (hasProtocol(id)) return id
        if (isAbsolute(id))
          return pathToFileURL(join(nuxt.options.srcDir, nuxt.options.dir.public, id))
        return pathToFileURL(resolveAlias(id))
      }
      const transformOptions = {
        fallbacks: options.fallbacks,
        resolvePath,
        css: cssContext,
        skipFontFaceGeneration: (fallbackName: string) => {
          return (
            options.inline &&
            options.fonts.some(font => {
              const previouslyGeneratedFallbackName =
                typeof font === 'string'
                  ? generateFallbackName(font)
                  : font.fallbackName || generateFallbackName(font.family)
              return previouslyGeneratedFallbackName === fallbackName
            })
          )
        },
        sourcemap: !!nuxt.options.sourcemap.client,
      }
      addVitePlugin(FontaineTransform.vite(transformOptions), { server: false })
      addWebpackPlugin(FontaineTransform.webpack(transformOptions), { server: false })
      nuxt.hook('nitro:config', async config => {
        const plugins = await config.rollupConfig!.plugins
        if (!plugins || !Array.isArray(plugins)) return
        plugins.push(
          NitroTransformPlugin({
            sourcemap: true,
            cssContext,
          })
        )
      })
    }

    if (options.inline) {
      addPluginTemplate({
        filename: 'font-fallback-inlining-plugin.server.ts',
        getContents: async () =>
          [
            `import { defineNuxtPlugin, useHead } from '#imports'`,
            `const css = \`${(await css).replace(/\s+/g, ' ')}\``,
            `export default defineNuxtPlugin(() => { useHead({ style: [{ children: css ${
              !nuxt.options.dev && options.inject ? '+ __INLINED_CSS__ ' : ''
            }}] }) })`,
          ].join('\n'),
        mode: 'server',
      })
    } else {
      addTemplate({
        filename: 'font-fallbacks.css',
        write: true,
        getContents: () => css,
      })
      nuxt.options.css.push('#build/font-fallbacks.css')
    }
  },
})
