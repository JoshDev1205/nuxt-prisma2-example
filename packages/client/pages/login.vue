<template>
  <section class="section">
    <div class="container">
      <LoginForm :redirect="$route.query.redirect" />
    </div>
  </section>
</template>

<script>
import LoginForm from '~/components/forms/LoginForm';
export default {
  layout: 'blank',
  components: { LoginForm },
  middleware: [ 'isAnonymous' ],
};
</script>
