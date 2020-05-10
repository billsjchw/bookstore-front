<template>
<div>
    <nav-bar/>
    <div class="detail-view d-flex justify-content-center align-items-start mt-2">
        <div class="d-flex flex-column align-items-center">
            <img class="mt-3" :src="book.cover.data" :alt="book.title">
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
import BookRequest from "@/requests/BookRequest";
import Util from "@/util/Util";

export default {
    name: "BookView",
    components: {
        "nav-bar": NavBar,
        "add-to-cart": AddToCart,
        "book-info": BookInfo
    },
    data() {
        return {
            book: {
                isbn: "",
                title: "",
                author: "",
                language: "",
                press: "",
                date: "",
                price: 0,
                stock: 0,
                cover: { isbn: "", data: "" },
                introduction: { isbn: "", data: "" }
            }
        };
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            let isbn = this.$route.params.isbn;
            if (!Util.isValidISBN(isbn)) {
                alert("Invalid ISBN");
                window.location.href = "/books";
                return;
            }
            BookRequest.findBookByIsbn(isbn, msg => {
                if (msg.status === "UNAUTHORIZED")
                    window.location.href = "/login";
                else if (msg.status === "BOOK_NOT_FOUND") {
                    alert("Book not found");
                    window.location.href = "/books";
                } else if (msg.status !== "SUCCESS") {
                    alert("Unknown error");
                    window.location.href = "/books";
                } else
                    this.book = msg.data;
            });
        }
    }
};
</script>

<style scoped>
.detail-view {
    min-width: fit-content;
}
</style>
