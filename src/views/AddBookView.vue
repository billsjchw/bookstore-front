<template>
  <div class="edit-book-view">
    <nav-bar/>
    <div class="d-flex justify-content-center mt-3 mb-3">
      <add-book-form/>
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/NavBar';
  import AddBookForm from '@/components/AddBookForm';

  export default {
    name: 'EditBookForm',
    components: {
      'nav-bar': NavBar,
      'add-book-form': AddBookForm,
    },
  };
</script>

<style scoped>
  .edit-book-view {
    min-width: fit-content;
  }
</style>
