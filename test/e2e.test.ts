import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'

describe('font override inlining', async () => {
  await setup({
    server: true,
    rootDir: fileURLToPath(new URL('../playground', import.meta.url)),
  })
  it('inlines rules', async () => {
    const html = await $fetch('/')
    expect(html.match(/<style>.*?<\/style>/)).toMatchInlineSnapshot(`
      [
        "<style>@font-face { font-family: \\"fallback-a\\"; src: local(\\"Zapfino\\"); size-adjust: 100%; ascent-override: 92.7734%; descent-override: 24.4141%; line-gap-override: 0%; } @font-face { font-family: \\"fallback-b\\"; src: local(\\"Impact\\"); size-adjust: 100%; ascent-override: 92.7734%; descent-override: 24.4141%; line-gap-override: 0%; } @font-face { font-family: \\"fallback-c\\"; src: local(\\"Georgia\\"); size-adjust: 100.6674%; ascent-override: 92.1584%; descent-override: 24.2522%; line-gap-override: 0%; } @font-face { font-family: \\"fallback-poppins\\"; src: local(\\"Georgia\\"); size-adjust: 114.36%; ascent-override: 91.8154%; descent-override: 30.6051%; line-gap-override: 8.7443%; }  @font-face { font-family: \\"Poppins variant fallback\\"; src: local(\\"Noto Sans\\"); size-adjust: 106.5817%; ascent-override: 98.5159%; descent-override: 32.8386%; line-gap-override: 9.3825%; } @font-face { font-family: \\"Poppins variant fallback\\"; src: local(\\"Arial\\"); size-adjust: 113.7274%; ascent-override: 92.326%; descent-override: 30.7753%; line-gap-override: 8.793%; } @font-face { font-family: \\"Poppins variant fallback\\"; src: local(\\"Helvetica Neue\\"); size-adjust: 112.3043%; ascent-override: 93.496%; descent-override: 31.1653%; line-gap-override: 8.9044%; } @font-face { font-family: \\"Poppins variant fallback\\"; src: local(\\"Roboto\\"); size-adjust: 113.6018%; ascent-override: 92.4281%; descent-override: 30.8094%; line-gap-override: 8.8027%; } @font-face { font-family: \\"Poppins variant fallback\\"; src: local(\\"Segoe UI\\"); size-adjust: 113.4764%; ascent-override: 92.5303%; descent-override: 30.8434%; line-gap-override: 8.8124%; } @font-face { font-family: \\"Poppins variant fallback\\"; src: local(\\"BlinkMacSystemFont\\"); size-adjust: 122.1017%; ascent-override: 85.9939%; descent-override: 28.6646%; line-gap-override: 8.1899%; } @font-face { font-family: \\"Roboto fallback\\"; src: local(\\"Noto Sans\\"); size-adjust: 93.8205%; ascent-override: 98.884%; descent-override: 26.0221%; line-gap-override: 0%; } @font-face { font-family: \\"Roboto fallback\\"; src: local(\\"Arial\\"); size-adjust: 100.1106%; ascent-override: 92.6709%; descent-override: 24.3871%; line-gap-override: 0%; } @font-face { font-family: \\"Roboto fallback\\"; src: local(\\"Helvetica Neue\\"); size-adjust: 98.8578%; ascent-override: 93.8453%; descent-override: 24.6961%; line-gap-override: 0%; } @font-face { font-family: \\"Roboto fallback\\"; src: local(\\"Roboto\\"); size-adjust: 100%; ascent-override: 92.7734%; descent-override: 24.4141%; line-gap-override: 0%; } @font-face { font-family: \\"Roboto fallback\\"; src: local(\\"Segoe UI\\"); size-adjust: 99.8896%; ascent-override: 92.8759%; descent-override: 24.441%; line-gap-override: 0%; } @font-face { font-family: \\"Roboto fallback\\"; src: local(\\"BlinkMacSystemFont\\"); size-adjust: 107.4822%; ascent-override: 86.3152%; descent-override: 22.7145%; line-gap-override: 0%; } </style>",
      ]
    `)
  })
})
