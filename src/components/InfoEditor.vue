<template>
<div>
    <b-modal class="info-editor" scrollable no-close-on-backdrop :title="modalTitle" ref="modal">
        <div class="d-flex justify-content-between">
            <label class="d-block"><b>ISBN:</b></label>
            <div v-if="editionMode">{{isbn}}</div>
            <b-form-input v-else class="info-editor-input" type="text" v-model="isbn"/>
        </div>
        <div class="d-flex justify-content-between mt-2">
            <label class="d-block"><b>Title:</b></label>
            <b-form-input class="info-editor-input" type="text" v-model="title"/>
        </div>
        <div class="d-flex justify-content-between mt-2">
            <label class="d-block"><b>Author:</b></label>
            <b-form-input class="info-editor-input" type="text" v-model="author"/>
        </div>
        <div class="d-flex justify-content-between mt-2">
            <label class="d-block"><b>Cover:</b></label>
            <div class="info-editor-input d-flex">
                <b-form-file accept=".jpg" :placeholder="coverInputPlaceHolder" v-model="cover"/>
                <b-icon class="h-100 ml-1" icon="backspace" @click="handleClearCover"/>
            </div>
        </div>
        <div class="d-flex justify-content-between mt-2">
            <label class="d-block"><b>Price (cent):</b></label>
            <b-form-input class="info-editor-input" type="number" number v-model="price"/>
        </div>
        <div class="d-flex justify-content-between mt-2">
            <label class="d-block"><b>Stock:</b></label>
            <b-form-input class="info-editor-input" type="number" number v-model="stock"/>
        </div>
        <div class="d-flex justify-content-between mt-2">
            <label class="d-block"><b>Language:</b></label>
            <b-form-input class="info-editor-input" type="text" v-model="lang"/>
        </div>
        <div class="d-flex justify-content-between mt-2">
            <label class="d-block"><b>Press:</b></label>
            <b-form-input class="info-editor-input" type="text" v-model="press"/>
        </div>
        <div class="d-flex justify-content-between mt-2">
            <label class="d-block"><b>Publication date:</b></label>
            <b-form-input class="info-editor-input" type="date" v-model="date"/>
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
import Util from "@/util/Util";

export default {
    name: "InfoEditor",
    data() {
        return {
            isbn: "",
            title: "",
            author: "",
            cover: null,
            price: 0,
            press: "",
            date: "1970-01-01",
            lang: "",
            stock: 0,
            intro: "",
            editionMode: true
        };
    },
    computed: {
        modalTitle() {
            return this.editionMode ? "Edit the information" : "Add a new book";
        },
        coverInputPlaceHolder() {
            return this.editionMode ? "Original cover" : "No file chosen";
        }
    },
    methods: {
        show(book) {
            this.editionMode = book !== undefined;
            if (book === undefined)
                book = new Book();
            for (let prop in book)
                this[prop] = book[prop];
            this.cover = null;
            this.$refs["modal"].show();
        },
        handleClearCover() {
            this.cover = null;
        },
        handleCommit() {
            if (!this.editionMode && !Util.isValidISBN(this.isbn)) {
                alert("Invalid ISBN");
                return;
            }
            if (typeof(this.price) !== "number" || Number.isNaN(this.price)) {
                alert("Price should be a number");
                return;
            }
            if (!Number.isInteger(this.price) || this.price < 0 || this.price >= 1000000000) {
                alert("Price should be a non-negative integer less than 1000000000");
                return;
            }
            if (typeof(this.stock) !== "number" || Number.isNaN(this.stock)) {
                alert("Stock should be a number");
                return;
            }
            if (!Number.isInteger(this.stock) || this.stock < 0 || this.stock >= 1000000000) {
                alert("Stock should be a non-negative integer less than 1000000000");
                return;
            }
            if (this.date === "") {
                alert("Wrong publication date");
                return;
            }
            if (!this.editionMode && this.cover === null) {
                alert("No cover chosen");
                return;
            }
            let book = new Book(this);
            this.$refs["modal"].hide();
            if (this.editionMode)
                this.$emit("edition-success", book);
            else
                this.$emit("addition-success", book);
        }
    }
};
</script>

<style scoped>
.info-editor {
    min-width: 500px;
    max-width: 500px;
}
.info-editor-input {
    min-width: 300px;
    max-width: 300px;
}
</style>
