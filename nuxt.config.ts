// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules:["@nuxtjs/ionic", "@formkit/nuxt", "@nuxtjs/tailwindcss"],
  css:["~/assets/variables.css"],
  experimental: {
    // We have to disable payload extraction, or it will break the non-SSR build
    payloadExtraction: false,
  },
  ionic: {
    integrations: {
      pwa: false,
      router: true
    }
  },
  runtimeConfig: {
    public:{
      API_URL: "https://flask-production-a622.up.railway.app"
    }
    
  }
})