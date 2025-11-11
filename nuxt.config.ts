// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  ssr: true,
  devtools: { enabled: true },
  devServer: {
    port: 5436
  },
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL
  },
  app: {
    head: {
      title: 'Cinéma Chaplin',
      htmlAttrs: {
        lang: 'fr',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      ],
    },
  },
  nitro: {
    preset: 'netlify',
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml', '/robots.txt'],
      ignore: ['/admin'],
    },
    routeRules: {
      '/': { cache: { maxAge: 15 * 60 } },
      '/tarifs': { cache: { maxAge: 60 * 60 * 24 } },
      '/a-propos': { cache: { maxAge: 60 * 60 * 24 } },
      '/films/**': { cache: { maxAge: 60 * 60 } },
      '/api/**': { cache: false }
    },
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
    '@pinia/nuxt',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
  ],

  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3000/api',
      apiKey: process.env.NUXT_PUBLIC_API_KEY || ''
    }
  }
})