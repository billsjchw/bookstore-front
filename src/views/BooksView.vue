<template>
<div class="books-view">
    <nav-bar/>
    <book-list
        class="mt-3"
        :books="books"
        :row-num="rowNum"
        :col-num="colNum"
    />
</div>
</template>

<script>
import NavBar from "@/components/NavBar";
import BookList from "@/components/BookList";
import books from "@/books";

export default {
    name: "BooksView",
    components: {
        "nav-bar": NavBar,
        "book-list": BookList
    },
    data: function() {
        return {
            books: books,
            rowNum: 2,
            colNum: 4
        };
    }
};
</script>

<style scoped>
.books-view {
    min-width: fit-content;
}
</style>
