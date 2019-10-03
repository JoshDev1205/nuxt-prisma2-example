<template>
  <form name="login" @submit.prevent="login">
    <input v-model="form.email" type="email" placeholder="Email">
    <input v-model="form.password" type="password" placeholder="Password">
    <button type="submit">
      Login
    </button>
  </form>
</template>

<script>
export default {
  data: () => ({
    form: {
      email: '',
      password: '',
    },
  }),
  methods: {
    async login () {
      await this.$store
        .dispatch('auth/login', this.form)
        .catch(error => console.error(error));

      this.$router.replace(this.$route.query.redirect || '/');
    },
  },
};
</script>
