import { makeSchema } from 'nexus';
import * as resolvers from './resolvers';
import { join } from 'path';

export const schema = makeSchema({
  types: { ...resolvers },
  outputs: {
    schema: join(__dirname, 'generated/schema.graphql'),
    typegen: join(__dirname, 'generated/nexus-typegen.d.ts'),
  },
  typegenAutoConfig: {
    sources: [{ source: join(__dirname, './types.d.ts'), alias: 'types' }],
    contextType: 'types.ApolloContext',
  },

});
