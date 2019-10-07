<template>
  <section class="section">
    <div class="container">
      <LoginForm />
    </div>
  </section>
</template>

<script>
import LoginForm from '@/components/LoginForm';
export default {
  layout: 'blank',
  components: { LoginForm },
  middleware: [ 'isAnonymous' ],
};
</script>
