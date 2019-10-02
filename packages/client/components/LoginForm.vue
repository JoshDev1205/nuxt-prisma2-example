<template>
  <form name="login" @submit.prevent="login">
    <input type="email" placeholder="Email" v-model="form.email" />
    <input type="password" placeholder="Password" v-model="form.password" />
    <button type="submit">Login</button>
  </form>
</template>

<script>
export default {
  data: () => ({
    form: {
      email: "",
      password: ""
    }
  }),
  methods: {
    login() {
      this.$axios
        .$post("/auth/login", {
          email: this.form.email,
          password: this.form.password
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => console.error(error));
    }
  }
};
</script>