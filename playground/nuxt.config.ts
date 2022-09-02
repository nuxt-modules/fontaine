import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: ['nuxt-font-metrics'],
  fontMetrics: {
    fonts: [
      {
        family: 'Roboto',
        fallbacks: ['Zapfino'],
        overrideName: 'fallback-a',
      },
      {
        family: 'Roboto',
        fallbacks: ['Impact'],
        overrideName: 'fallback-b',
      },
      {
        family: 'Roboto',
        fallbacks: ['Georgia'],
        overrideName: 'fallback-c',
      },
    ]
  }
})
