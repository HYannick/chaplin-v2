// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  ssr: true,
  devtools: { enabled: true },
  devServer: {
    port: 5436
  },
  app: {
    head: {
      title: 'Cinéma Chaplin',
      htmlAttrs: {
        lang: 'fr',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
  nitro: {
    preset: 'netlify',
    devProxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/leaflet',
    '@nuxtjs/device',
    '@pinia/colada-nuxt',
    '@pinia/nuxt'
  ],

  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3000/api',
      apiKey: process.env.NUXT_PUBLIC_API_KEY || ''
    }
  }
})