<template>
  <div id="app">
    <h1>Nuxt.js / Prisma2</h1>
    <p>{{ hello }}</p>
  </div>
</template>

<script>
export default {
  asyncData (_context) {
    return {
      hello: 'Hello World',
    };
  },
};
</script>
