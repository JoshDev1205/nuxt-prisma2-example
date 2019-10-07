<template>
  <div class="home">
    <section class="section">
      <div class="container">
        <h1 class="title">
          Nuxt.js / Prisma2
        </h1>
        <Hello />
      </div>
    </section>
  </div>
</template>

<script>
import Hello from '@/components/Hello.vue';

export default {
  components: { Hello },
};
</script>
