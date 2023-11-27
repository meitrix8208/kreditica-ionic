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
      API_URL: "https://1d60-2800-484-6a83-b010-e9c6-88d1-4031-6d85.ngrok-free.app"
    }
    
  }
})