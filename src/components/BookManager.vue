<template>
<div class="book-manager d-flex flex-column align-items-center">
    <div>
        <div class="d-flex justify-content-between mb-3">
            <div class="book-manager-button-group"></div>
            <search-bar v-model="search"/>
            <b-button-group class="book-manager-button-group">
                <b-button variant="secondary" @click="handleRefresh"><b-icon icon="arrow-repeat"/></b-button>
                <b-button variant="secondary" @click="handleAddBook"><b-icon icon="file-plus"/></b-button>
            </b-button-group>
        </div>
        <b-table
            class="book-manager-table mt-1"
            striped
            sticky-header
            :fields="fields"
            :items="items"
            :filter="search"
            :filter-function="matches"
            :per-page="perPage"
            :current-page="page"
        >
            <template v-slot:cell(info)="row">
                <div class="d-flex justify-content-center align-items-center">
                    <span class="book-manager-table-icon" @click="handleShowInfo(row.item.isbn)">&#8943;</span>
                </div>
            </template>
            <template v-slot:cell(price)="row">
                &yen;{{(row.item.price / 100).toFixed(2)}}
            </template>
            <template v-slot:cell(operations)="row">
                <div class="d-flex justify-content-center">
                    <span class="book-manager-table-icon" @click="handleEditInfo(row.item.isbn)">&#9999;</span>
                    <span class="book-manager-table-icon" @click="handleDeleteBook(row.item.isbn)">&#128465;</span>
                </div>
            </template>
        </b-table>
        <b-pagination
            v-model="page"
            :total-rows="items.length"
            :per-page="perPage"
        />
    </div>
    <info-editor
        v-on:edition-success="handleEditionSuccess"
        v-on:addition-success="handleAdditionSuccess"
        ref="editor"
    />
    <add-book
        ref="add-book"
    />
</div>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import InfoEditor from "@/components/InfoEditor";
import AddBook from "@/components/AddBook";
import BookRequest from "@/requests/BookRequest";

export default {
    name: "BookManager",
    props: ["perPage"],
    components: {
        "add-book": AddBook,
        "search-bar": SearchBar,
        "info-editor": InfoEditor
    },
    data() {
        return {
            search: {
                type: "title",
                text: ""
            },
            fields: [
                {key: "isbn", label: "ISBN", sortable: true},
                {key: "title", label: "Title", sortable: true},
                {key: "author", label: "Author", sortable: true},
                {key: "info", label: "Details", sortable: false},
                {key: "price", label: "Price", sortable: true},
                {key: "stock", label: "Stock", sortable: true},
                {key: "operations", label: "Operations", sortable: false}
            ],
            items: [],
            page: 1
        };
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            BookRequest.findAllBooks(msg => {
                if (msg.status === "SUCCESS")
                    this.items = msg.data;
            });
        },
        matches(book, filter) {
            return book[filter.type].toLowerCase().indexOf(filter.text.toLowerCase()) >= 0;
        },
        handleRefresh() {
            this.fetchData();
        },
        handleAddBook() {
            this.$refs["add-book"].show();
        },
        handleShowInfo(isbn) {
            window.open("/books/" + isbn);
        },
        handleEditInfo(isbn) {
            let book = this.items.find(book => (book.isbn === isbn));
            this.$refs["editor"].show(book);
        },
        handleDeleteBook(isbn) {
            let index = this.items.findIndex(book => (book.isbn === isbn));
            this.items.splice(index, 1);
        },
        handleEditionSuccess(book) {
            let isbn = book.isbn;
            let index = this.items.findIndex(book => (book.isbn === isbn));
            this.$set(this.items, index, book);
        },
        handleAdditionSuccess(book) {
            let isbn = book.isbn;
            let index = this.items.findIndex(book => (book.isbn === isbn));
            if (index >= 0)
                this.$set(this.items, index, book);
            else
                this.items.push(book);
        }
    }
};
</script>

<style scoped>
.book-manager .book-manager-button-group {
    min-width: 92px;
    max-width: 92px;
}
.book-manager .book-manager-table {
    min-width: 1000px;
    max-width: 1000px;
    max-height: 600px;
}
.book-manager .book-manager-table .book-manager-table-icon {
    cursor: pointer
}
</style>
