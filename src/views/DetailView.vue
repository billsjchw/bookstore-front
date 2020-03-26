<template>
<div class="d-flex justify-content-center align-items-start">
    <img :src="image" :alt="book.title">
    <book-info class="ml-3" :book="book"/>
</div>
</template>

<script>
import BookInfo from "@/components/BookInfo";
import books from "@/books";

export default {
    name: "DetailView",
    components: {
        "book-info": BookInfo
    },
    data: function() {
        return {
            book: books.find(
                book => (book.isbn === this.$route.params.isbn)
            )
        };
    },
    computed: {
        image: function() {
            return require("../assets/books/" + this.book.isbn + ".jpg");
        }
    }
};
</script>