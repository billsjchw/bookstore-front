<template>
  <div class="book-manager d-flex flex-column align-items-center">
    <div class="w-100 d-flex justify-content-between">
      <div class="book-manager__button-group mr-2"/>
      <search-bar @search="handleSearch" class="book-manager__search-bar"/>
      <b-button-group class="book-manager__button-group ml-2">
        <b-button @click="handleRefresh" variant="secondary">
          <b-icon icon="arrow-repeat"/>
        </b-button>
        <b-button @click="handleAddBook" variant="secondary">
          <b-icon icon="file-plus"/>
        </b-button>
      </b-button-group>
    </div>
    <div v-if="loading"><b-spinner/></div>
    <div v-else>
      <book-table :books="books" @show-detail="handleShowDetail" @edit-book="handleEditBook"
                  @delete-book="handleDeleteBook" class="mt-3"/>
    </div>
    <b-pagination v-model="page" :total-rows="totalBooks"
                  :per-page="pageSize" @change="handleSwitchPage"/>
    <delete-book-modal :book="deleteBookModal.book" ref="delete-book-modal"/>
  </div>
</template>

<script>
  import book_service from '@/services/book_service';
  import SearchBar from '@/components/SearchBar';
  import BookTable from '@/components/BookTable';
  import DeleteBookModal from '@/components/DeleteBookModal';

  export default {
    name: 'BookManager',
    components: {
      'search-bar': SearchBar,
      'book-table': BookTable,
      'delete-book-modal': DeleteBookModal,
    },
    props: {
      pageSize: Number,
    },
    data() {
      return {
        page: 1,
        keyword: '',
        books: [],
        totalBooks: 0,
        loading: false,
        deleteBookModal: {
          book: null,
        },
      };
    },
    created() {
      this.fetchBooks('', 0);
    },
    methods: {
      fetchBooks(keyword, page) {
        this.loading = true;
        let callback = (msg) => {
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
      handleRefresh() {
        if (this.loading)
          return;
        this.fetchBooks(this.keyword, this.page - 1);
      },
      handleShowDetail(book) {
        let href = this.$router.resolve({ name: 'Book', params: { 'id': book.id } }).href;
        open(href, '_blank');
      },
      handleEditBook(book) {
        let href = this.$router.resolve({ name: 'EditBook', params: { 'id': book.id } }).href;
        open(href, '_blank');
      },
      handleDeleteBook(book) {
        this.deleteBookModal.book = book;
        this.$refs['delete-book-modal'].show();
      },
      handleAddBook() {
        let href = this.$router.resolve({ name: 'AddBook' }).href;
        open(href, '_blank');
      },
    },
  };
</script>

<style scoped>
  .book-manager__search-bar {
    min-width: 500px;
    max-width: 500px;
  }
  .book-manager__button-group {
    min-width: 92px;
    max-width: 92px;
  }
</style>
