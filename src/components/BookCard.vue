<template>
  <b-card @click="handleClick" no-body class="book-card">
    <div class="d-flex justify-content-center pt-3 pl-3 pr-3">
      <img class="book-card__cover" :src="book.cover.data" :alt="book.title">
    </div>
    <b-card-body>
      <b-card-text class="book-card__text">
        <span>{{ book.title }}</span><br/>
        <span>{{ book.author }}</span><br/>
        <span>￥{{ (book.price / 100).toFixed(2) }}</span>
      </b-card-text>
    </b-card-body>
  </b-card>
</template>

<script>
  export default {
    name: 'BookCard',
    props: {
      book: Object,
    },
    methods: {
      handleClick() {
        this.$router.push(`/book/${this.book.id}`);
      },
    },
  };
</script>

<style scoped>
  .book-card {
    min-width: 200px;
    max-width: 200px;
    border: 0;
    cursor: pointer;
  }
  .book-card:hover {
    color: dodgerblue;
  }
  .book-card__cover {
    min-height: 200px;
    max-height: 200px;
  }
  .book-card__text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
