<template>
  <section class="section">
    <div class="container">
      <SignupForm :redirect="$route.query.redirect" />
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
