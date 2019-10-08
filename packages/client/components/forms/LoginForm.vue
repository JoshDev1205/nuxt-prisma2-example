<template>
  <div class="login-form">
    <ValidationObserver ref="observer" v-slot="{ invalid, passes }" slim>
      <form @submit.prevent="passes(login)">
        <ValidationProvider v-slot="{ errors, valid }" rules="required|email" name="Email">
          <b-field label="Email" :type="{'is-danger': errors[0], 'is-success': valid}" :message="errors">
            <b-input v-model="email" type="email" />
          </b-field>
        </ValidationProvider>
        <ValidationProvider v-slot="{errors}" rules="required" name="Password">
          <b-field label="Password" :type="{'is-danger': errors[0]}" :message="errors">
            <b-input v-model="password" type="password" />
          </b-field>
        </ValidationProvider>
        <b-button type="is-primary" native-type="submit" :disabled="invalid">
          Log in
        </b-button>
        <GitHubButton :redirect="$route.query.redirect" />
        <HomeButton class="is-pulled-right" />
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import GitHubButton from '@/components/ui/GitHubButton';
import HomeButton from '@/components/ui/HomeButton';
export default {
  components: { GitHubButton, HomeButton },
  data: () => ({
    email: '',
    password: '',
  }),
  methods: {
    login () {
      const vm = this;
      this.$store
        .dispatch('auth/login', {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          vm.$router.replace(this.$route.query.redirect || '/');
        })
        .catch((error) => {
          vm.$buefy.snackbar.open({
            message: error.message,
            type: 'is-danger',
          });
        });
    },
  },
};
</script>
