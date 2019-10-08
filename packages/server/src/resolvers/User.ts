import { objectType, extendType } from "nexus";

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.email();
    t.model.githubProfileId();
  },
});

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.user();
    t.crud.users();
  },
});

export const UserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneUser();
    t.crud.deleteManyUser();
    t.crud.deleteOneUser();
    t.crud.updateManyUser();
    t.crud.updateOneUser();
    t.crud.upsertOneUser();
  },
});
