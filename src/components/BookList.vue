<template>
<div class="d-flex flex-column align-items-center">
    <search-bar
        v-model="search"
    />
    <book-grid
        :books="currentBooks"
        :col-num="colNum"
    />
    <b-pagination
        v-model="page"
        :total-rows="selectedBooks.length"
        :per-page="rowNum * colNum"
    />
</div>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import BookGrid from "@/components/BookGrid";
import BookRequest from "@/requests/BookRequest";

export default {
    name: "BookList",
    props: ["rowNum", "colNum"],
    components: {
        "search-bar": SearchBar,
        "book-grid": BookGrid,
    },
    data() {
        return {
            books: [],
            page: 1,
            search: {
                type: "title",
                text: ""
            }
        };
    },
    created() {
        this.fetchData();
    },
    computed: {
        selectedBooks() {
            return this.books.filter(
                book => (book[this.search.type].toLowerCase().indexOf(this.search.text.toLowerCase()) >= 0)
            );
        },
        currentBooks() {
            return this.selectedBooks.slice(
                (this.page - 1) * this.rowNum * this.colNum,
                (this.page) * this.rowNum * this.colNum
            );
        }
    },
    methods: {
        fetchData() {
            BookRequest.findAllBooks(msg => {
                if (msg.status === "SUCCESS")
                    this.books = msg.data;
            });
        },
    }
};
</script>
