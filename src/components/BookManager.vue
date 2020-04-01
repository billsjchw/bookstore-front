<template>
<div class="book-manager d-flex flex-column align-items-center">
    <search-bar
        class="mb-3"
        v-model="search"
    />
    <b-table
        class="book-manager-table"
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
            <div class="d-flex justify-content-center">
                <font-awesome-icon
                    class="book-manager-table-icon"
                    icon="ellipsis-h"
                    @click="handleShowInfo(row.item.isbn)"
                />
            </div>
        </template>
        <template v-slot:cell(price)="row">
            &yen;{{(row.item.price / 100).toFixed(2)}}
        </template>
        <template v-slot:cell(operations)="row">
            <div class="d-flex justify-content-center">
                <font-awesome-icon
                    class="book-manager-table-icon"
                    icon="pen"
                    @click="handleEditInfo(row.item.isbn)"
                />
                <font-awesome-icon
                    class="book-manager-table-icon ml-1"
                    icon="trash-alt"
                    @click="handleDeleteBook(row.item.isbn)"
                />
            </div>
        </template>
    </b-table>
    <b-pagination
        class=""
        v-model="page"
        :total-rows="items.length"
        :per-page="perPage"
    />
    <info-editor v-on:edition-success="handleEditionSuccess" ref="editor"/>
</div>
</template>

<script>
import books from "@/books";
import SearchBar from "@/components/SearchBar";
import InfoEditor from "@/components/InfoEditor";

export default {
    name: "BookManager",
    props: ["perPage"],
    components: {
        "search-bar": SearchBar,
        "info-editor": InfoEditor
    },
    data: function() {
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
            items: JSON.parse(JSON.stringify(books)),
            page: 1
        };
    },
    methods: {
        matches: function(book, filter) {
            return book[filter.type].toLowerCase().indexOf(filter.text.toLowerCase()) >= 0;
        },
        handleShowInfo: function(isbn) {
            window.open("/books/" + isbn);
        },
        handleEditInfo: function(isbn) {
            let book = this.items.find(book => (book.isbn === isbn));
            this.$refs["editor"].show(book);
        },
        handleDeleteBook: function(isbn) {
            let index = this.items.findIndex(book => (book.isbn === isbn));
            this.items.splice(index, 1);
        },
        handleEditionSuccess: function(book) {
            let isbn = book.isbn;
            let index = this.items.findIndex(book => (book.isbn === isbn));
            this.$set(this.items, index, book);
        }
    }
};
</script>

<style scoped>
.book-manager .book-manager-table {
    min-width: 1000px;
    max-width: 1000px;
    max-height: 600px;
}
.book-manager .book-manager-table .book-manager-table-icon {
    cursor: pointer
}
</style>