<template>
  <b-table :items="books" :fields="fields" class="book-table"
           bordered>
    <template v-slot:cell(book_id)="row">
      {{ row.item.id }}
    </template>
    <template v-slot:cell(isbn)="row">
      {{ row.item.isbn }}
    </template>
    <template v-slot:cell(title)="row">
      {{ row.item.title }}
    </template>
    <template v-slot:cell(price)="row">
      &yen;{{ (row.item.price / 100).toFixed(2) }}
    </template>
    <template v-slot:cell(stock)="row">
      {{ row.item.stock }}
    </template>
    <template v-slot:cell(detail)="row">
      <div class="book-table__icon-wrapper">
        <b-icon @click="handleShowDetail(row.item)" icon="three-dots"
                class="book-table__icon-button"/>
      </div>
    </template>
    <template v-slot:cell(operations)="row">
      <div class="book-table__icon-wrapper">
        <b-icon @click="handleEditBook(row.item)" icon="pencil-square"
                class="book-table__icon-button"/>
        <b-icon @click="handleDeleteBook(row.item)" icon="trash-fill"
                class="book-table__icon-button ml-2"/>
      </div>
    </template>
  </b-table>
</template>

<script>
  export default {
    name: 'BookTable',
    props: {
      books: Array,
    },
    data() {
      return {
        fields: [
          { key: 'book_id', label: 'Book ID' },
          { key: 'isbn', label: 'ISBN' },
          { key: 'title', label: 'Title' },
          { key: 'price', label: 'Price' },
          { key: 'stock', label: 'Stock' },
          { key: 'detail', label: 'Detail' },
          { key: 'operations', label: 'Operations' },
        ],
      };
    },
    methods: {
      handleShowDetail(book) {
        this.$emit('show-detail', book);
      },
      handleEditBook(book) {
        this.$emit('edit-book', book);
      },
      handleDeleteBook(book) {
        this.$emit('delete-book', book);
      },
    },
  };
</script>

<style scoped>
  .book-table__icon-wrapper {
    text-align: center;
  }
  .book-table__icon-button {
    cursor: pointer;
  }
</style>
