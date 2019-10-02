<template>
  <button @click="logout">Logout</button>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  methods: {
    logout() {
      this.$axios.$post("/auth/logout")
        .then(response => {
          console.log(response);
        })
        .catch(error => console.error('Error'));
        console.log('Done');
    }
  }
});
</script>