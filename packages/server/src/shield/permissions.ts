import { shield, allow } from 'graphql-shield';
import { hasRole } from './rules';

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
