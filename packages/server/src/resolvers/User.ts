import { objectType, extendType } from "nexus";

export const User = objectType({
  name: 'User',
  definition: function (t) {
    t.model.id();
    t.model.role();
    t.model.email();
    t.model.firstName();
    t.model.lastName();
    t.model.githubProfileId();
  },
});

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.user();
    t.crud.users({ filtering: true, ordering: true, pagination: false });
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
