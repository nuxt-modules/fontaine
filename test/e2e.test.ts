import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'

describe('font override inlining', async () => {
  await setup({
    server: true,
    rootDir: fileURLToPath(new URL('../playground', import.meta.url)),
  })
  it('inlines rules', async () => {
    const html = await $fetch<string>('/')
    expect(html.match(/<style>.*?<\/style>/)).toMatchInlineSnapshot(`
      [
        "<style>@font-face { font-family: "fallback-a"; src: local("Zapfino"); size-adjust: 100%; ascent-override: 92.7734%; descent-override: 24.4141%; line-gap-override: 0%; } @font-face { font-family: "fallback-b"; src: local("Impact"); size-adjust: 100%; ascent-override: 92.7734%; descent-override: 24.4141%; line-gap-override: 0%; } @font-face { font-family: "fallback-c"; src: local("Georgia"); size-adjust: 99.7809%; ascent-override: 92.9771%; descent-override: 24.4677%; line-gap-override: 0%; } @font-face { font-family: "fallback-poppins"; src: local("Georgia"); size-adjust: 112.1577%; ascent-override: 93.6182%; descent-override: 31.2061%; line-gap-override: 8.916%; }  @font-face { font-family: "Poppins variant fallback"; src: local("Noto Sans"); size-adjust: 105.4852%; ascent-override: 99.54%; descent-override: 33.18%; line-gap-override: 9.48%; } @font-face { font-family: "Poppins variant fallback"; src: local("Arial"); size-adjust: 112.1577%; ascent-override: 93.6182%; descent-override: 31.2061%; line-gap-override: 8.916%; } @font-face { font-family: "Poppins variant fallback"; src: local("Helvetica Neue"); size-adjust: 111.1111%; ascent-override: 94.5%; descent-override: 31.5%; line-gap-override: 9%; } @font-face { font-family: "Poppins variant fallback"; src: local("Roboto"); size-adjust: 112.404%; ascent-override: 93.4131%; descent-override: 31.1377%; line-gap-override: 8.8965%; } @font-face { font-family: "Poppins variant fallback"; src: local("Segoe UI"); size-adjust: 112.7753%; ascent-override: 93.1055%; descent-override: 31.0352%; line-gap-override: 8.8672%; } @font-face { font-family: "Roboto fallback"; src: local("Noto Sans"); size-adjust: 93.8448%; ascent-override: 98.8584%; descent-override: 26.0154%; line-gap-override: 0%; } @font-face { font-family: "Roboto fallback"; src: local("Arial"); size-adjust: 99.7809%; ascent-override: 92.9771%; descent-override: 24.4677%; line-gap-override: 0%; } @font-face { font-family: "Roboto fallback"; src: local("Helvetica Neue"); size-adjust: 98.8498%; ascent-override: 93.8529%; descent-override: 24.6981%; line-gap-override: 0%; } @font-face { font-family: "Roboto fallback"; src: local("Roboto"); size-adjust: 100%; ascent-override: 92.7734%; descent-override: 24.4141%; line-gap-override: 0%; } @font-face { font-family: "Roboto fallback"; src: local("Segoe UI"); size-adjust: 100.3304%; ascent-override: 92.4679%; descent-override: 24.3337%; line-gap-override: 0%; } </style>",
      ]
    `)
  })
})
