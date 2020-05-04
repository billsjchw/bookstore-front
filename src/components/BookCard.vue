<template>
<div>
    <b-card class="book-card" no-body @click="handleClick">
        <div class="d-flex justify-content-center pt-3 pl-3 pr-3">
            <img class="book-card-image" :src="image" :alt="book.title">
        </div>
        <b-card-body>
            <b-card-text class="book-card-text">
                {{book.title}}<br/>
                {{book.author}}<br/>
                &yen;{{(book.price / 100).toFixed(2)}}
            </b-card-text>
        </b-card-body>
    </b-card>
</div>
</template>

<script>
export default {
    name: "BookCard",
    props: ["book"],
    computed: {
        image() {
            return require("../assets/books/" + this.book.isbn + ".jpg");
        }
    },
    methods: {
        handleClick() {
            window.open(`/book/${this.book.isbn}`, "_blank");
        }
    }
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
.book-card .book-card-image {
    min-height: 200px;
    max-height: 200px;
}
.book-card .book-card-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
