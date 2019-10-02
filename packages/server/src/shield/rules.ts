import { rule } from 'graphql-shield';

export const isAuthenticated = rule({ cache: 'contextual' })(
  (_parent, _args, { user }) => !!user || 'Not Authenticated!'
);
