<template>
  <div class="book-list d-flex flex-column align-items-center">
    <search-bar @search="handleSearch" class="book-list__search-bar"/>
    <div v-if="loading"><b-spinner/></div>
    <div v-else>
      <book-grid v-if="!loading" :books="books" :row-size="rowSize"/>
    </div>
    <b-pagination v-model="page" :total-rows="totalBooks"
                  :per-page="pageSize" @change="handleSwitchPage"/>
  </div>
</template>

<script>
  import SearchBar from '@/components/SearchBar';
  import book_service from '@/services/book_service';
  import BookGrid from '@/components/BookGrid';

  export default {
    name: 'BookList',
    components: {
      'book-grid': BookGrid,
      'search-bar': SearchBar,
    },
    props: {
      pageSize: Number,
      rowSize: Number,
    },
    data() {
      return {
        page: 1,
        keyword: '',
        books: [],
        totalBooks: 0,
        loading: false,
      };
    },
    created() {
      this.fetchBooks('', 0);
    },
    methods: {
      fetchBooks(keyword, page) {
        this.loading = true;
        let callback = (msg) => {
          console.log(msg);
          if (msg.status === 'SUCCESS') {
            this.keyword = keyword;
            this.page = page + 1;
            this.books = msg.data.content;
            this.totalBooks = msg.data.totalElements;
          }
          this.loading = false;
        };
        if (keyword)
          book_service.bookFuzzySearch(keyword, page, this.pageSize, callback);
        else
          book_service.findAllBooks(page, this.pageSize, callback);
      },
      handleSearch(keyword) {
        if (this.loading)
          return;
        this.fetchBooks(keyword, 0);
      },
      handleSwitchPage(page) {
        if (this.loading)
          return;
        this.fetchBooks(this.keyword, page - 1);
      },
    },
  };
</script>

<style scoped>
  .book-list__search-bar {
    min-width: 500px;
    max-width: 500px;
  }
</style>
