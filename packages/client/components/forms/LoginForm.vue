<template>
  <form name="login" @submit.prevent="login">
    <b-field label="E-mail">
      <b-input v-model="form.email" type="email" />
    </b-field>
    <b-field label="Password">
      <b-input v-model="form.password" type="password" />
    </b-field>
    <b-button type="is-primary" native-type="submit">
      Login
    </b-button>
    <HomeButton class="is-pulled-right" />
  </form>
</template>

<script>
import HomeButton from '@/components/ui/HomeButton';
export default {
  components: { HomeButton },
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
