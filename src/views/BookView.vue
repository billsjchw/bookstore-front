<template>
<div>
    <nav-bar/>
    <div class="detail-view d-flex justify-content-center align-items-start mt-2">
        <div class="d-flex flex-column align-items-center">
            <img class="mt-3" :src="image" :alt="book.title">
            <add-to-cart class="mt-2" :isbn="book.isbn"/>
        </div>
        <book-info class="ml-3" :book="book"/>
    </div>
</div>
</template>

<script>
import NavBar from "@/components/NavBar";
import AddToCart from "@/components/AddToCart";
import BookInfo from "@/components/BookInfo";
import books from "@/books";

export default {
    name: "BookView",
    components: {
        "nav-bar": NavBar,
        "add-to-cart": AddToCart,
        "book-info": BookInfo
    },
    data() {
        let book = books.find(book => (book.isbn === this.$route.params.isbn));
        if (book === undefined)
            window.location.href = encodeURI(`/error/The book is not found`);
        return {
            book: book
        };
    },
    computed: {
        image() {
            return require("../assets/books/" + this.book.isbn + ".jpg");
        }
    }
};
</script>

<style scoped>
.detail-view {
    min-width: fit-content;
}
</style>
