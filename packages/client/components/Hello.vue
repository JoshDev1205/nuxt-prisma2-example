<template>
  <div class="hello">
    {{ hello }}
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
