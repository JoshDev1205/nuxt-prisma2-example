<template>
  <b-button tag="a" :href="authUrl">
    Authenticate with GitHub
  </b-button>
</template>

<script>
import { authGitHubPath } from '../../../server/src/auth/utils';
export default {
  props: {
    redirect: {
      type: String,
      default: '/',
    },
  },
  computed: {
    authUrl () {
      return `${authGitHubPath}?redirect=${this.redirect || '/'}`;
    },
  },
};
</script>
