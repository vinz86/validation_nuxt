// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
    modules: [
      'nuxt-primevue',
      '@vee-validate/nuxt',
    ],
    primevue: {
      components: {
        include: '*',
        exclude: ['Galleria', 'Carousel']
      }
    }
})
