import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  modules: ['@nuxtjs/fontaine'],
  css: [fileURLToPath(new URL('../playground/assets/css/fonts/font.css', import.meta.url))],
  dir: {
    public: '../playground/public',
  },
  compatibilityDate: '2024-08-19',
  fontMetrics: {
    fonts: [
      {
        family: 'Roboto',
        fallbacks: ['Zapfino'],
        fallbackName: 'fallback-a',
      },
      {
        family: 'Roboto',
        fallbacks: ['Impact'],
        fallbackName: 'fallback-b',
      },
      {
        family: 'Roboto',
        fallbacks: ['Georgia'],
        fallbackName: 'fallback-c',
      },
      {
        family: 'Poppins',
        fallbacks: ['Georgia'],
        fallbackName: 'fallback-poppins',
        src: 'poppins.ttf',
        root: '../playground/assets',
      },
    ],
  },
})
