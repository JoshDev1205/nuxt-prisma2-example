<template>
  <div class="signup-form">
    <ValidationObserver ref="observer" v-slot="{ invalid, passes }" slim>
      <form @submit.prevent="passes(signup)">
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
          Sign up
        </b-button>
        <HomeButton class="is-pulled-right" />
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import HomeButton from '@/components/ui/HomeButton';
export default {
  props: {
    redirect: String
  },
  components: { HomeButton },
  data: () => ({
    email: '',
    password: '',
  }),
  methods: {
    signup () {
      const vm = this;
      this.$store
        .dispatch('auth/signup', {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          vm.$router.replace(this.redirect || '/');
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
