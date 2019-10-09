<template>
  <b-table :data="users">
    <template slot-scope="props">
      <b-table-column field="email" label="Email">{{ props.row.email}}</b-table-column>
      <b-table-column>
        <b-button @click="deleteUser(props.row.id)">
          <b-icon icon="delete" />
        </b-button>
      </b-table-column>
    </template>
    <template slot="empty">
      <section class="section">
        <div class="content has-text-grey has-text-centered">
          <p>
            <b-icon icon="emoticon-sad" size="is-large"></b-icon>
          </p>
          <p>Nothing here.</p>
        </div>
      </section>
    </template>
  </b-table>
</template>

<script>
import gql from "graphql-tag";
import users from "@/apollo/queries/users.gql";
import deleteOneUser from "@/apollo/mutations/deleteOneUser.gql";
export default {
  apollo: {
    users: {
      query: users
    }
  },
  methods: {
    deleteUser(id) {
      this.$apollo
        .mutate({
          mutation: deleteOneUser,
          variables: {
            id
          },
          update: (store, result) => {
            const data = store.readQuery({
              query: users
            });
            const index = data.users.findIndex(
              user => user.id === result.data.deleteOneUser.id
            );
            if (index !== -1) {
              data.users.splice(index, 1);
              store.writeQuery({
                query: users,
                data
              });
            }
          }
        })
        .then(result => {
          this.$buefy.snackbar.open({
            message: `Deleted user ${id}`,
            type: "is-danger"
          });
        });
    }
  }
};
</script>