export default defineNuxtConfig({
  modules: ['@nuxtjs/fontaine'],
  css: ['~/assets/css/fonts/font.css'],
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
        root: 'assets',
      },
    ],
  },
})
