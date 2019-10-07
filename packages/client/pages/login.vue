<template>
  <section class="section">
    <div class="container">
      <LoginForm />
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
