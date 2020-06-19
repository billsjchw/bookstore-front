<template>
  <div class="book-admin-view">
    <nav-bar/>
    <div class="d-flex justify-content-center mt-3">
      <book-manager :page-size="8"/>
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/NavBar';
  import BookManager from '@/components/BookManager';

  export default {
    name: 'BookAdminView',
    components: {
      'nav-bar': NavBar,
      'book-manager': BookManager,
    },
  };
</script>

<style scoped>
  .book-admin-view {
    min-width: fit-content;
  }
</style>
