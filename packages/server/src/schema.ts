import { nexusPrismaPlugin } from '@generated/nexus-prisma';
import { ApolloContext } from './types';
import { makeSchema } from 'nexus';
import * as resolvers from './resolvers';
import { join } from 'path';

const nexusPrisma = nexusPrismaPlugin({
  photon: (context: ApolloContext) => context.photon,
});

export const schema = makeSchema({
  types: { ...resolvers, nexusPrisma },
  outputs: {
    schema: join(__dirname, 'generated/schema.graphql'),
    typegen: join(__dirname, 'generated/nexus-typegen.d.ts'),
  },
  typegenAutoConfig: {
    sources: [
      { source: '@generated/photon', alias: 'photon' },
      { source: join(__dirname, './types.d.ts'), alias: 'types' },
    ],
    contextType: 'types.ApolloContext',
  },

});
