<template>
<div class="detail-view d-flex justify-content-center align-items-start">
    <div class="d-flex flex-column align-items-center">
        <img class="mt-3" :src="image" :alt="book.title">
        <add-to-cart class="mt-2" :isbn="book.isbn"/>
        <edit-info class="mt-2" :book="book"/>
    </div>
    <book-info class="ml-3" :book="book"/>
</div>
</template>

<script>
import AddToCart from "@/components/AddToCart";
import EditInfo from "@/components/EditInfo";
import BookInfo from "@/components/BookInfo";
import books from "@/books";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
    name: "DetailView",
    components: {
        "add-to-cart": AddToCart,
        "edit-info": EditInfo,
        "book-info": BookInfo
    },
    data: function() {
        let book = books.find(book => (book.isbn === this.$route.params.isbn));
        if (book === undefined)
            window.location.href = encodeURI(`/errors/The book is not found`);
        return {
            book: book
        };
    },
    computed: {
        image: function() {
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