<template>
  <b-navbar wrapper-class="container">
    <template slot="end">
      <b-navbar-item tag="div">
        <LogoutButton v-if="$store.getters['auth/isAuthenticated']" />
        <div v-else>
          <LoginButton />
          <SignupButton />
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import LoginButton from '@/components/ui/LoginButton';
import LogoutButton from '@/components/ui/LogoutButton';
import SignupButton from '@/components/ui/SignupButton';
export default {
  components: {
    LoginButton,
    LogoutButton,
    SignupButton,
  },
};
</script>
