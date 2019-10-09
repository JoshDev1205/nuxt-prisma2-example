import { makeSchema } from 'nexus';
import { nexusPrismaPlugin } from 'nexus-prisma';
import * as appTypes from '../resolvers';

const nexusPrismaTypes = nexusPrismaPlugin({ types: appTypes });
const allTypes = [ appTypes, nexusPrismaTypes ];

export const schema = makeSchema({
  types: allTypes,
  typegenAutoConfig: {
    contextType: 'types.ApolloContext',
    sources: [
      {
        source: '@generated/photon',
        alias: 'photon',
      },
      {
        source: require.resolve('../types.d.ts'),
        alias: 'types',
      },
    ],
  },
});
