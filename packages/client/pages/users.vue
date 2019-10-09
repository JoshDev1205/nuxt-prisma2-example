<template>
  <section class="section">
    <div class="container">
      <UsersTable />
    </div>
  </section>
</template>

<script>
import UsersTable from '@/components/admin/UsersTable';
export default {
  components: { UsersTable },
};
</script>
