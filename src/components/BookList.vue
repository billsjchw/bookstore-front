<template>
<div class="d-flex flex-column align-items-center">
    <search-bar v-model="search"/>
    <book-grid :books="curBooks" :col-num="colNum"/>
    <b-pagination
        v-model="page"
        :total-rows="selBooks.length"
        :per-page="rowNum * colNum"
    />
</div>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import BookGrid from "@/components/BookGrid";
import {BPagination} from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.min.css";

export default {
    name: "BookList",
    props: ["books", "rowNum", "colNum"],
    components: {
        "search-bar": SearchBar,
        "book-grid": BookGrid,
        "b-pagination": BPagination
    },
    data: function() {
        return {
            page: 1,
            search: {
                type: "title",
                text: ""
            }
        };
    },
    computed: {
        selBooks: function() {
            return this.books.filter(
                (book) => (book[this.search.type].toLowerCase().indexOf(this.search.text.toLowerCase()) >= 0)
            );
        },
        curBooks: function() {
            return this.selBooks.slice(
                (this.page - 1) * this.rowNum * this.colNum,
                (this.page) * this.rowNum * this.colNum
            );
        }
    }
};
</script>
