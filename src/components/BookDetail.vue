<template>
  <div class="book-detail">
    <h1>{{ book.title }}</h1>
    <p class="h5">{{ book.author }}</p>
    <p class="h5">￥{{ (book.price / 100).toFixed(2) }}</p>
    <h4>Detail</h4>
    <b-table :items="detail" bordered striped/>
    <h4>Introduction</h4>
    <p v-html="book.intro.data.replace(/\n/g, '\u003cbr/\u003e')"/>
  </div>
</template>

<script>
  export default {
    name: "BookDetail",
    props: {
      book: Object,
    },
    computed: {
      detail() {
        return [
          { attribute: 'ISBN', value: this.book.isbn },
          { attribute: 'Title', value: this.book.title },
          { attribute: 'Author', value: this.book.author },
          { attribute: 'Language', value: this.book.lang },
          { attribute: 'Press', value: this.book.press },
          { attribute: 'Publication data', value: this.book.date },
          { attribute: 'Price', value: `￥${(this.book.price / 100).toFixed(2)}` },
          { attribute: 'Stock', value: this.book.stock },
        ];
      }
    },
  };
</script>

<style scoped>
  .book-detail {
    min-width: 700px;
    max-width: 700px;
  }
</style>
