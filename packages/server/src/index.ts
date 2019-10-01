import { GraphQLServer } from 'graphql-yoga';
import { schema } from './schema';
import { ApolloContext } from './types';
import { Photon } from '@generated/photon';

// Prisma2 Photon client
export const photon = new Photon;

// GraphQL Server
const server = new GraphQLServer({
  schema,
  context: (): ApolloContext => ({
    photon,
  }),
});

// Start Listening
const serverOptions = {
  port: process.env.SERVER_PORT || 4000,
};
server.start(serverOptions, () => {
  console.log(`ℹ Listening on http://localhost:${serverOptions.port}`);
});
