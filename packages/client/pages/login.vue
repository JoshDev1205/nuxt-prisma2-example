<template>
  <section class="section hero is-fullheight is-light">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-two-fifths">
            <LoginForm :redirect="$route.query.redirect" />
          </div>
        </div>
      </div>
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
