<template>
  <div class="book-detail">
    <div v-if="loading">
      <b-spinner/>
    </div>
    <div v-else-if="error">
      <p>Failed to load the book</p>
    </div>
    <div v-else>
      <div class="d-flex justify-content-center">
        <div class="d-flex flex-column align-items-center">
          <img :src="book.cover.data" :alt="book.title">
          <add-to-cart :book-id="book.id" class="mt-2"/>
        </div>
        <div class="book-detail__book-attributes ml-3">
          <h1>{{ book.title }}</h1>
          <p class="h5">{{ book.author }}</p>
          <p class="h5">&yen;{{ (book.price / 100).toFixed(2) }}</p>
          <h4>Detail</h4>
          <b-table :items="detail" bordered striped/>
          <h4>Introduction</h4>
          <p v-html="book.intro.data.replace(/\n/g, '\u003cbr/\u003e')"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import AddToCart from '@/components/AddToCart';
  import util from '@/utils/util';
  import book_service from '@/services/book_service';

  export default {
    name: "BookDetail",
    props: {
      bookId: String,
    },
    components: {
      'add-to-cart': AddToCart,
    },
    data() {
      return {
        loading: true,
        error: false,
        book: null,
      };
    },
    computed: {
      detail() {
        return [
          { attribute: 'ISBN', value: this.book.isbn },
          { attribute: 'Title', value: this.book.title },
          { attribute: 'Author', value: this.book.author },
          { attribute: 'Language', value: this.book.lang },
          { attribute: 'Press', value: this.book.press },
          { attribute: 'Publication Data', value: this.book.date },
          { attribute: 'Price', value: `¥${(this.book.price / 100).toFixed(2)}` },
          { attribute: 'Stock', value: this.book.stock },
        ];
      }
    },
    created() {
      let bookId = Number(this.bookId);
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
  .book-detail__book-attributes {
    min-width: 700px;
    max-width: 700px;
  }
</style>
