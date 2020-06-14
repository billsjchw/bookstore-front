<template>
  <div class="home-view">
    <nav-bar/>
    <div class="d-flex justify-content-center mt-3">
      <book-list :page-size="8" :row-size="4"/>
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/NavBar';
  import BookList from '@/components/BookList';

  export default {
    name: 'HomeView',
    components: {
      'book-list': BookList,
      'nav-bar': NavBar,
    },
  };
</script>

<style scoped>
  .home-view {
    min-width: fit-content;
  }
</style>
