import { GraphQLServer } from 'graphql-yoga';
import { schema } from './schema';
import { ApolloContext } from './types';

// GraphQL Server
const server = new GraphQLServer({
  schema,
  context: (): ApolloContext => ({}),
});

// Start Listening
const serverOptions = {
  port: process.env.SERVER_PORT || 4000,
};
server.start(serverOptions, () => {
  console.log(`ℹ Listening on http://localhost:${serverOptions.port}`);
});
