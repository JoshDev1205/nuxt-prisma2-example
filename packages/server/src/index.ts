import { GraphQLServer } from 'graphql-yoga';
import { schema } from './schema';
import { ApolloContext } from './types';
import { Photon } from '@generated/photon';
import { PubSub } from 'graphql-subscriptions';
import proxy from 'http-proxy-middleware';

// Prisma2 Photon client
export const photon = new Photon;

// PubSub instance
export const pubsub = new PubSub;

// GraphQL Server
const server = new GraphQLServer({
  schema,
  context: (): ApolloContext => ({
    photon,
    pubsub,
  }),
});

// Nuxt Proxy
const nuxtPort = process.env.NUXT_PORT || 3000;
const nuxtPath = /^\/(?!graphql).*/;
server.express.use(nuxtPath, proxy({
  target: `http://localhost:${nuxtPort}`,
  changeOrigin: true,
  logLevel: 'warn',
}));

// Start Listening
const serverPort = process.env.SERVER_PORT || 4000;
server.start({
  port: serverPort,
  endpoint: '/graphql',
  playground: '/graphql',
  subscriptions: {
    path: '/graphql',
  },
}, () => {
  console.log(`ℹ Listening on http://localhost:${serverPort}/graphql`);
});
