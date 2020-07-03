<template>
  <b-table :items="items" :fields="fields"
           class="item-table" bordered>
    <template v-slot:cell(book_id)="row">
      {{ row.item.book.id }}
    </template>
    <template v-slot:cell(isbn)="row">
      {{ row.item.book.isbn }}
    </template>
    <template v-slot:cell(title)="row">
      {{ row.item.book.title }}
    </template>
    <template v-slot:cell(amount)="row">
      {{ row.item.amount }}
    </template>
  </b-table>
</template>

<script>
  export default {
    name: 'ItemTable',
    props: {
      items: Array,
    },
    data() {
      return {
        fields: [
          { key: 'book_id', label: 'Book ID' },
          { key: 'isbn', label: 'ISBN' },
          { key: 'title', label: 'Title' },
          { key: 'amount', label: 'Amount' },
        ],
      };
    },
  };
</script>

<style scoped>
</style>
