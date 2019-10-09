import { GraphQLServer } from 'graphql-yoga';
import { schema } from './schema';
import { permissions } from "./shield/permissions";
import { ApolloContext } from './types';
import { photon, pubsub } from './lib';
import { router as authRouter } from './auth';
import proxy from 'http-proxy-middleware';
import { getUserFromCookie } from './auth/utils';
import { ConnectionParams, ConnectionContext } from 'subscriptions-transport-ws';

// GraphQL Server
const server = new GraphQLServer({
  schema,
  middlewares: [permissions],
  context: ({ request, connection }): ApolloContext => {
    let user = null;
    if (request) {
      user = getUserFromCookie(request.headers.cookie || '');
    } else if (connection) {
      user = connection.context.user || null;
    }
    return {
      photon,
      pubsub,
      user,
    };
  },
});

// Authentication Router
server.express.use(authRouter);

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
    onConnect: (_connectionParams: ConnectionParams, _webSocket: WebSocket, { request }: ConnectionContext): ApolloContext => {
      const user = getUserFromCookie(request.headers.cookie || '');
      return {
        photon,
        pubsub,
        user,
      };
    },
  },
}, () => {
  console.log(`ℹ Listening on http://localhost:${serverPort}/graphql`);
});
