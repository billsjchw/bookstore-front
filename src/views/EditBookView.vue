<template>
  <div class="edit-book-view">
    <nav-bar/>
    <div class="d-flex justify-content-center mt-3 mb-3">
      <edit-book-form :book-id="$route.params.id"/>
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/NavBar';
  import EditBookForm from '@/components/EditBookForm';

  export default {
    name: 'EditBookForm',
    components: {
      'nav-bar': NavBar,
      'edit-book-form': EditBookForm,
    },
  };
</script>

<style scoped>
  .edit-book-view {
    min-width: fit-content;
  }
</style>
