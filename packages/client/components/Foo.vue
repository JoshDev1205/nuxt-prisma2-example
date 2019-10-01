<template>
  <div class="foo">
    {{ foo }}
  </div>
</template>

<script>
import foo from '@/apollo/subscriptions/foo.gql';

export default {
  data: () => ({ foo: '' }),
  apollo: {
    $subscribe: {
      foo: {
        query: foo,
        variables () {
          return {
            foo: this.foo,
          };
        },
        result ({ data }) {
          this.foo = data.foo;
        },
      },
    },
  },
};
</script>
