<template>
  <div id="login">
    <LoginForm />
    <LogoutButton />
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';
import LogoutButton from '@/components/LogoutButton.vue';
export default {
  components: { LoginForm, LogoutButton },
  middleware: ['isAnonymous'],
};
</script>
