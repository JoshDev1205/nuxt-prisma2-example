<template>
  <section class="section">
    <div class="container">
      <SignupForm />
    </div>
  </section>
</template>

<script>
import SignupForm from '~/components/forms/SignupForm';
export default {
  layout: 'blank',
  components: { SignupForm },
  middleware: [ 'isAnonymous' ],
};
</script>
