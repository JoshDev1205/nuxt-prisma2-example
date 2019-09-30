<template>
  <div id="app">
    <h1>Nuxt.js / Prisma2</h1>
    <p>{{ hello }}</p>
  </div>
</template>

<script>
import hello from '@/apollo/queries/hello.gql';

export default {
  apollo: {
    hello: {
      query: hello,
    },
  },
};
</script>
