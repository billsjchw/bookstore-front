<template>
<div>
    <b-card class="book-card" no-body>
        <div class="d-flex justify-content-center pt-3 pl-3 pr-3">
            <img :src="image" :alt="book.title">
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
import {BCard, BCardBody, BCardText} from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
    name: "BookCard",
    props: ["book"],
    components: {
        "b-card": BCard,
        "b-card-body": BCardBody,
        "b-card-text": BCardText
    },
    computed: {
        image: function() {
            return require("../assets/books/" + this.book.isbn + ".jpg");
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
    .book-card .book-card-text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>