<template>
  <div class="book-view">
    <nav-bar/>
    <div class="mt-3">
      <div v-if="loading">
        <b-spinner/>
      </div>
      <div v-else>
        <div v-if="error">
          <p>Failed to load the book</p>
        </div>
        <div v-else class="d-flex justify-content-center">
          <div class="d-flex flex-column align-items-center">
            <img :src="book.cover.data" :alt="book.title">
            <add-to-cart :book-id="book.id" class="mt-2"/>
          </div>
          <book-detail :book="book" class="ml-3"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import book_service from '@/services/book_service';
  import NavBar from '@/components/NavBar';
  import BookDetail from '@/components/BookDetail';
  import util from '@/utils/util';
  import AddToCart from '@/components/AddToCart';

  export default {
    name: 'BookView',
    components: {
      AddToCart,
      'nav-bar': NavBar,
      'book-detail': BookDetail,
    },
    data() {
      return {
        book: null,
        loading: true,
        error: false,
      };
    },
    created() {
      let bookId = Number(this.$route.params.id);
      if (!util.isInt(bookId)) {
        this.error = true;
        this.loading = false;
        return;
      }
      book_service.findBookById(bookId, (msg) => {
        if (msg.status === 'SUCCESS')
          this.book = msg.data;
        else
          this.error = true;
        this.loading = false;
      });
    },
  };
</script>

<style scoped>
  .book-view {
    min-width: fit-content;
  }
</style>
