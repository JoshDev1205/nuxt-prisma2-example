import { GraphQLServer } from 'graphql-yoga';

// GraphQL Schema
const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`;
const resolvers = {
  Query: {
    hello: (): string => `Hello World`,
  },
};

// GraphQL Server
const server = new GraphQLServer({ typeDefs, resolvers });

// Start Listening
const serverOptions = {
  port: process.env.SERVER_PORT || 4000,
};
server.start(serverOptions, () => {
  console.log(`ℹ Listening on http://localhost:${serverOptions.port}`);
});
