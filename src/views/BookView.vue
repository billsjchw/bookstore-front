<template>
  <div class="book-view">
    <nav-bar/>
    <div class="d-flex justify-content-center">
      <book-detail :book-id="$route.params.id" class="mt-3"/>
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/NavBar';
  import BookDetail from '@/components/BookDetail';

  export default {
    name: 'BookView',
    components: {
      'nav-bar': NavBar,
      'book-detail': BookDetail,
    },
  };
</script>

<style scoped>
  .book-view {
    min-width: fit-content;
  }
</style>
