<template>
  <div class="secret">
    <section class="section">
      <div class="container">
        <GitHubButton />
      </div>
    </section>
  </div>
</template>

<script>
import GitHubButton from '@/components/ui/GitHubButton';
export default {
  components: { GitHubButton },
  middleware: [ 'isAuthenticated' ],
};
</script>
