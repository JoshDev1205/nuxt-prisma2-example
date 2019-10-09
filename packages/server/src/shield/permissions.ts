import { shield, allow } from 'graphql-shield';

export const permissions = shield({
  Query: {
    '*': allow,
  },
  Mutation: {
    '*': allow,
  },
  Subscription: {
    '*': allow,
  },
});
