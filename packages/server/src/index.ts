import { GraphQLServer } from 'graphql-yoga';
import { schema } from './schema';
import { ApolloContext } from './types';
import { Photon } from '@generated/photon';
import { PubSub } from 'graphql-subscriptions';

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

// Start Listening
const serverOptions = {
  port: process.env.SERVER_PORT || 4000,
};
server.start(serverOptions, () => {
  console.log(`ℹ Listening on http://localhost:${serverOptions.port}/`);
});
