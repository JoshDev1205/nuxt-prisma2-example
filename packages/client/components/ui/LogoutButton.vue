<template>
  <b-button type="is-light" @click="logout">
    Log out
  </b-button>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  methods: {
    logout () {
      this.$store.dispatch('auth/logout')
        .then(() => this.$router.push('/'))
        .catch(error => console.error(error));
    },
  },
});
</script>
