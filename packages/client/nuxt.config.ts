import { Configuration } from '@nuxt/types';

const nuxtPort = process.env.NUXT_PORT || 3000;
const serverPort = process.env.SERVER_PORT || 4000;

const config: Configuration = {

  // Nuxt modules
  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
  ],

  // Apollo configuration
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: `http://localhost:${serverPort}/graphql`,
        wsEndpoint: `ws://localhost:${serverPort}/graphql`,
      },
    },
  },

  // Axios configuration
  axios: {
    baseURL: `http://localhost:${serverPort}`,
  },

  // Nuxt plugins
  plugins: [
    '@/plugins/buefy.ts',
    '@/plugins/vee-validate.ts',
  ],

  // Styles
  css: [
    '@/assets/scss/main.scss',
  ],
  styleResources: {
    scss: [
      '@/assets/scss/_variables.scss',
    ],
  },

  // Server configuration
  server: {
    port: nuxtPort,
  },

  // Webpack configuration
  build: {
    transpile: [
      'vee-validate/dist/rules',
    ],
    extend (config: any, { isClient, isDev }: any) {
      if (isDev) {
        config.devtool = isClient ? 'source-map' : 'inline-source-map';
      }
    },
  },
  buildModules: ['@nuxt/typescript-build'],
};

export default config;
