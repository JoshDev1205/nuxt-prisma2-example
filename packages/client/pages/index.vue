<template>
  <div id="app">
    <h1>Nuxt.js / Prisma2</h1>
    <p>{{ hello }}</p>
    <Foo />
  </div>
</template>

<script>
import hello from '@/apollo/queries/hello.gql';
import Foo from '@/components/Foo.vue';

export default {
  components: { Foo },
  apollo: {
    hello: {
      query: hello,
    },
  },
};
</script>
