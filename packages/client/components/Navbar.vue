<template>
  <b-navbar wrapper-class="container">
    <template slot="end">
      <b-navbar-item tag="div">
        <LogoutButton v-if="$store.getters['auth/isAuthenticated']" />
        <LoginButton v-else />
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import LoginButton from '@/components/LoginButton';
import LogoutButton from '@/components/LogoutButton';
export default {
  components: {
    LoginButton, LogoutButton,
  },
};
</script>
