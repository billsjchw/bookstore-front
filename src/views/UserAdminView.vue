<template>
  <div class="book-admin-view">
    <nav-bar/>
    <div class="d-flex justify-content-center mt-3">
      <user-manager :page-size="8"/>
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/NavBar';
  import UserManager from '@/components/UserManager';

  export default {
    name: 'UserAdminView',
    components: {
      'nav-bar': NavBar,
      'user-manager': UserManager,
    },
  };
</script>

<style scoped>
  .book-admin-view {
    min-width: fit-content;
  }
</style>
