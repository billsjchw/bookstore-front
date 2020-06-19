<template>
  <b-modal title="Delete book" ref="modal" class="delete-book-modal">
    <div v-if="book">
      <p>Are you sure to delete the book?</p>
      <hr/>
      <p>
        <strong>Book ID</strong>: {{ book.id }}<br/>
        <strong>ISBN</strong>: {{ book.isbn }}<br/>
        <strong>Title</strong>: {{ book.title }}
      </p>
    </div>
    <template v-slot:modal-footer>
      <span v-if="loading"><b-spinner/></span>
      <span v-else>{{ respMsg }}</span>
      <b-button @click="handleCancel" :disabled="loading" variant="secondary">Cancel</b-button>
      <b-button @click="handleDelete" :disabled="loading" variant="danger">Delete</b-button>
    </template>
  </b-modal>
</template>

<script>
  import book_service from '@/services/book_service';

  export default {
    name: 'DeleteBookModal',
    props: {
      book: Object,
    },
    watch: {
      book() {
        this.loading = false;
        this.error = false;
        this.respMsg = '';
      },
    },
    data() {
      return {
        loading: false,
        error: false,
        respMsg: '',
      };
    },
    methods: {
      show() {
        this.$refs['modal'].show();
      },
      hide() {
        this.$refs['modal'].hide();
      },
      handleCancel() {
        this.hide();
      },
      handleDelete() {
        if (this.loading)
          return;
        this.loading = true;
        book_service.deleteBookById(this.book.id, (msg) => {
          if (msg.status === 'SUCCESS') {
            this.error = false;
            this.respMsg = 'Success';
          } else if (msg.status === 'UNAUTHORIZED') {
            this.error = true;
            this.respMsg = 'Please sign in first';
          } else if (msg.status === 'REJECTED') {
            this.error = true;
            this.respMsg = 'Permission denied';
          } else if (msg.status === 'BOOK_NOT_FOUND') {
            this.error = true;
            this.respMsg = 'Book not found';
          } else if (msg.status === 'BOOK_IS_ORDERED') {
            this.error = true;
            this.respMsg = 'Book is ordered';
          } else {
            this.error = true;
            this.respMsg = 'Unknown error';
          }
          this.loading = false;
        });
      },
    },
  };
</script>

<style scoped>
</style>
