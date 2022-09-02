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
        "<style>@font-face { font-family: \\"fallback-a\\"; src: local(\\"Zapfino\\"); ascent-override: 92.7734375%; descent-override: 24.4140625%; line-gap-override: 0%; } @font-face { font-family: \\"fallback-b\\"; src: local(\\"Impact\\"); ascent-override: 92.7734375%; descent-override: 24.4140625%; line-gap-override: 0%; } @font-face { font-family: \\"fallback-c\\"; src: local(\\"Georgia\\"); ascent-override: 92.7734375%; descent-override: 24.4140625%; line-gap-override: 0%; }  @font-face { font-family: \\"Poppins variant override\\"; src: local(\\"BlinkMacSystemFont\\"),local(\\"Segoe UI\\"),local(\\"Roboto\\"),local(\\"Helvetica Neue\\"),local(\\"Arial\\"),local(\\"Noto Sans\\"); ascent-override: 105%; descent-override: 35%; line-gap-override: 10%; } @font-face { font-family: \\"Roboto override\\"; src: local(\\"BlinkMacSystemFont\\"),local(\\"Segoe UI\\"),local(\\"Roboto\\"),local(\\"Helvetica Neue\\"),local(\\"Arial\\"),local(\\"Noto Sans\\"); ascent-override: 92.7734375%; descent-override: 24.4140625%; line-gap-override: 0%; } </style>",
      ]
    `)
  })
})
