import { Configuration } from '@nuxt/types';

const nuxtPort = process.env.NUXT_PORT || 3000;

const config: Configuration = {
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
