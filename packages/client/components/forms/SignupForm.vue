<template>
  <div class="card">
    <div class="card-content">
      <ValidationObserver ref="observer" v-slot="{ invalid, passes }" slim>
        <form @submit.prevent="passes(signup)">
          <ValidationProvider v-slot="{ errors, valid }" rules="required|email" name="Email">
            <b-field
              label="Email"
              :type="{'is-danger': errors[0], 'is-success': valid}"
              :message="errors"
            >
              <b-input v-model="email" type="email" />
            </b-field>
          </ValidationProvider>
          <ValidationProvider v-slot="{errors}" rules="required" name="Password">
            <b-field label="Password" :type="{'is-danger': errors[0]}" :message="errors">
              <b-input v-model="password" type="password" />
            </b-field>
          </ValidationProvider>
          <hr>
          <div class="field is-grouped">
            <div class="control">
              <b-button type="is-primary" native-type="submit" :disabled="invalid">
                Sign up
              </b-button>
            </div>
            <div class="control">
              <HomeButton />
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import HomeButton from '@/components/ui/HomeButton';
export default {
  components: { HomeButton },
  props: {
    redirect: {
      type: String,
      default: '/',
    },
  },
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
