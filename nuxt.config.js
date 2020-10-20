import colors from 'vuetify/es5/util/colors'

export default {
  css: ['~/assets/main.css'],
  pageTransition: 'test',
  middleware: 'auth',
  router: {
    middleware: ['auth']
  },
  generate:{
    fallback: true
  },
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  ssr: false,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: '%s : ' + "Welcome",
    title: "NearByStore" || '',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    // Doc: https://github.com/nuxt/content
    '@nuxt/content',
    '@nuxtjs/toast',
  ],
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'http://127.0.0.1:8000/api/auth/login/',
            method: 'POST',
            propertyName: 'key'
          },
          logout: {
            url: 'http://127.0.0.1:8000/api/auth/logout/',
            method: 'get'
          },
          user: {
            url: 'http://127.0.0.1:8000/api/auth/user/',
            method: 'get',
            propertyName: false
          }
        },
        tokenRequired: true,
        tokenType: "Token",
        globalToken: true,
        autoFetchUser: true
      }
    } 
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL:'http://127.0.0.1:8000',
  },
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  toast: {
    position: 'top-right',
    duration: 2500,
    keepOnHover: true
  },
}
