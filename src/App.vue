<template>
<div id="app">
    <book-list :books="books" :row-num="rowNum" :col-num="colNum"/>
</div>
</template>

<script>
import BookList from "@/components/BookList";
import books from "@/books";

export default {
    name: 'App',
    components: {
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

<style>
</style>
