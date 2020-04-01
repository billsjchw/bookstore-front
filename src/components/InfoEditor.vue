<template>
<div>
    <b-modal class="book-editor" scrollable no-close-on-backdrop title="Edit the information" ref="modal">
        <div class="d-flex justify-content-between">
            <label><b>ISBN:</b></label>
            <span>{{isbn}}</span>
        </div>
        <div class="d-flex justify-content-between mt-2">
            <label><b>Title:</b></label>
            <b-form-input class="book-editor-input" type="text" v-model="title"/>
        </div>
        <div class="d-flex justify-content-between mt-2">
            <label><b>Author:</b></label>
            <b-form-input class="book-editor-input" type="text" v-model="author"/>
        </div>
        <div class="d-flex justify-content-between mt-2">
            <label><b>Cover:</b></label>
            <b-form-file class="book-editor-input" accept=".jpg" v-model="cover"/>
        </div>
        <div class="d-flex justify-content-between mt-2">
            <label><b>Price (cent):</b></label>
            <b-form-input class="book-editor-input" type="number" v-model="price"/>
        </div>
        <div class="d-flex justify-content-between mt-2">
            <label><b>Stock:</b></label>
            <b-form-input class="book-editor-input" type="number" v-model="stock"/>
        </div>
        <div class="d-flex justify-content-between mt-2">
            <label><b>Language:</b></label>
            <b-form-input class="book-editor-input" type="text" v-model="lang"/>
        </div>
        <div class="d-flex justify-content-between mt-2">
            <label><b>Press:</b></label>
            <b-form-input class="book-editor-input" type="text" v-model="press"/>
        </div>
        <div class="d-flex justify-content-between mt-2">
            <label><b>Publication date:</b></label>
            <b-form-input class="book-editor-input" type="date" v-model="date"/>
        </div>
        <div class="mt-2">
            <label class="d-block"><b>Introduction:</b></label>
            <b-form-textarea v-model="intro"/>
        </div>
        <template v-slot:modal-footer>
            <b-button variant="primary" @click="handleCommit">Commit</b-button>
        </template>
    </b-modal>
</div>
</template>

<script>
import Book from "@/Book";

export default {
    name: "Editor",
    data: function() {
        return {
            isbn: "",
            title: "",
            author: "",
            cover: null,
            price: "",
            press: "",
            date: "",
            lang: "",
            stock: "",
            intro: ""
        };
    },
    methods: {
        show: function(book) {
            for (let prop in book)
                this[prop] = book[prop];
            this.cover = null;
            this.$refs["modal"].show();
        },
        handleCommit: function() {
            let price = Number(this.price);
            if (Number.isNaN(price)) {
                alert("Price should be a number");
                return;
            }
            if (!Number.isInteger(price) || price < 0 || price >= 1000000000) {
                alert("Price should be a non-negative integer less than 1000000000");
                return;
            }
            let stock = Number(this.stock);
            if (Number.isNaN(stock)) {
                alert("Stock should be a number");
                return;
            }
            if (!Number.isInteger(stock) || stock < 0 || stock >= 1000000000) {
                alert("Stock should be a non-negative integer less than 1000000000");
                return;
            }
            let book = new Book(this);
            this.$refs["modal"].hide();
            this.$emit("edition-success", book);
        }
    }
};
</script>

<style scoped>
.book-editor {
    min-width: 500px;
    max-width: 500px;
}
.book-editor-input {
    min-width: 300px;
    max-width: 300px;
}
</style>
