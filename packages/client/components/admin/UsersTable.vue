<template>
  <b-table :data="users">
    <template slot-scope="props">
      <b-table-column field="email" label="Email">{{ props.row.email}}</b-table-column>
    </template>
  </b-table>
</template>

<script>
import users from "@/apollo/queries/users.gql";
export default {
  apollo: {
    users: {
      query: users
    }
  }
};
</script>