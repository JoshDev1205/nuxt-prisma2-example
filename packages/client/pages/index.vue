<template>
  <div id="app">
    <section class="section">
      <div class="container">
        <h1 class="title">
          Nuxt.js / Prisma2
        </h1>
        <Hello />
        <Foo />
      </div>
    </section>
  </div>
</template>

<script>
import Foo from '@/components/Foo.vue';
import Hello from '@/components/Hello.vue';

export default {
  components: { Foo, Hello },
};
</script>
