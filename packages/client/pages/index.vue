<template>
  <div id="app">
    <h1>Nuxt.js / Prisma2</h1>
    <Hello />
    <Foo />
  </div>
</template>

<script>
import Foo from '@/components/Foo.vue';
import Hello from '@/components/Hello.vue';

export default {
  components: { Foo, Hello },
};
</script>
