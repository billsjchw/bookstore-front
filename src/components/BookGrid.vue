<template>
  <div class="book-grid">
    <div v-for="(row, r) in rows" class="d-flex" :key="r">
      <book-card v-for="(book, c) in row" :book="book" :key="c"/>
    </div>
  </div>
</template>

<script>
  import BookCard from "@/components/BookCard";

  export default {
    name: "BookGrid",
    props: {
      books: Array,
      rowSize: Number,
    },
    components: {
      "book-card": BookCard
    },
    computed: {
      rows() {
        let rows = [];
        for (let i = 0; i < this.books.length; i += this.rowSize)
          rows.push(this.books.slice(i, i + this.rowSize));
        return rows;
      }
    }
  };
</script>

<style scoped>
</style>
