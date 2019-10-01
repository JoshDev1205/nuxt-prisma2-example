/* eslint-disable @typescript-eslint/no-empty-function */
import { mutationType, objectType } from "nexus";

export const BatchPayload = objectType({
  name: 'BatchPayload',
  definition(t) {
    t.field('count', { type: 'Int' });
  },
});

export const Mutation = mutationType({
  definition() { },
});
