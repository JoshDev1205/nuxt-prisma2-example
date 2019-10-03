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
    login () {
      this.$store
        .dispatch('auth/login', this.form)
        .then(() => this.$router.push('/'))
        .catch(error => console.error(error));
    },
  },
};
</script>
