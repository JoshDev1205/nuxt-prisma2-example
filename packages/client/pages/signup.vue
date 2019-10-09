<template>
  <section class="section hero is-fullheight is-light">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-two-fifths">
            <SignupForm :redirect="$route.query.redirect" />
          </div>
        </div>
      </div>
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
