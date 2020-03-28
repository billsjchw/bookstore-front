<template>
<b-modal class="book-editor" scrollable no-close-on-backdrop title="Edit the information" ref="modal">
    <div class="d-flex justify-content-between">
        <label><b>ISBN:</b></label>
        <span>{{book.isbn}}</span>
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
</template>

<script>
import {BModal, BFormInput, BFormFile, BFormTextarea, BButton} from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.min.css";

export default {
    name: "Editor",
    props: ["book"],
    components: {
        "b-modal": BModal,
        "b-form-input": BFormInput,
        "b-form-file": BFormFile,
        "b-form-textarea": BFormTextarea,
        "b-button": BButton
    },
    data: function() {
        return {
            title: this.book.title,
            author: this.book.author,
            cover: null,
            price: this.book.price,
            press: this.book.press,
            date: this.book.date,
            lang: this.book.lang,
            stock: this.book.stock,
            intro: this.book.intro
        };
    },
    methods: {
        show: function() {
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
            this.$refs["modal"].hide();
            alert("Edition completed successfully");
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
