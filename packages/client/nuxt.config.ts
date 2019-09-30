import { Configuration } from '@nuxt/types';

const nuxtPort = process.env.NUXT_PORT || 3000;
const serverPort = process.env.SERVER_PORT || 4000;

const config: Configuration = {
  modules: [
    '@nuxtjs/apollo',
  ],
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: `http://localhost:${serverPort}`,
        wsEndpoint: `ws://localhost:${serverPort}`,
      },
    },
  },
  server: {
    port: nuxtPort,
  },
  build: {
    extend (config: any, { isClient, isDev }: any) {
      if (isDev) {
        config.devtool = isClient ? 'source-map' : 'inline-source-map';
      }
    },
  },
  buildModules: ['@nuxt/typescript-build'],
};

export default config;
