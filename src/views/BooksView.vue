<template>
<div class="books-view">
    <nav-bar active-item="books"/>
    <book-list
        class="mt-3"
        :row-num="rowNum"
        :col-num="colNum"
    />
</div>
</template>

<script>
import NavBar from "@/components/NavBar";
import BookList from "@/components/BookList";

export default {
    name: "BooksView",
    components: {
        "nav-bar": NavBar,
        "book-list": BookList
    },
    data() {
        return {
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
