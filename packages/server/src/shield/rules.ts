import { IRule, rule } from 'graphql-shield';

export const isAuthenticated = rule({ cache: 'contextual' })(
  (_parent, _args, { user }) => !!user || 'Not Authenticated!',
);

export const hasRole = (role: string): IRule => rule({ cache: 'contextual' })(
  (_parent, _args, { user }) => {
    return (user && (user.roles.includes('ADMINISTRATOR') || user.roles.includes(role))) || `Role ${role} required`;
  },
);
