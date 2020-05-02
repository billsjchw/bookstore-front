<template>
<div>
    <b-modal class="add-book" scrollable no-close-on-backdrop title="Add a Book" ref="modal">
        <div class="d-flex justify-content-between">
            <label class="d-block"><b>ISBN:</b></label>
            <b-form-input class="add-book-input" type="text" v-model="book.isbn"
                          :state="correct.isbn" @change="correct.isbn = null"/>
        </div>
        <div class="d-flex justify-content-between mt-2">
            <label class="d-block"><b>Title:</b></label>
            <b-form-input class="add-book-input" type="text" v-model="book.title"/>
        </div>
        <div class="d-flex justify-content-between mt-2">
            <label class="d-block"><b>Author:</b></label>
            <b-form-input class="add-book-input" type="text" v-model="book.author"/>
        </div>
        <div class="d-flex justify-content-between mt-2">
            <label class="d-block"><b>Language:</b></label>
            <b-form-input class="add-book-input" type="text" v-model="book.lang"/>
        </div>
        <div class="d-flex justify-content-between mt-2">
            <label class="d-block"><b>Press:</b></label>
            <b-form-input class="add-book-input" type="text" v-model="book.press"/>
        </div>
        <div class="d-flex justify-content-between mt-2">
            <label class="d-block"><b>Publication Date:</b></label>
            <b-form-input class="add-book-input" type="date" v-model="book.date"/>
        </div>
        <div class="d-flex justify-content-between mt-2">
            <label class="d-block"><b>Cover:</b></label>
            <b-form-file class="add-book-input" accept=".jpg" placeholder="No file chosen"
                         v-model="book.file" :state="correct.file" @change="correct.file = null"/>
        </div>
        <div class="d-flex justify-content-between mt-2">
            <label class="d-block"><b>Price (cent):</b></label>
            <b-form-input class="add-book-input" type="number" number v-model="book.price"
                          :state="correct.price" @change="correct.price = null"/>
        </div>
        <div class="d-flex justify-content-between mt-2">
            <label class="d-block"><b>Stock:</b></label>
            <b-form-input class="add-book-input" type="number" number v-model="book.stock"
                          :state="correct.stock" @change="correct.stock = null"/>
        </div>
        <div class="mt-2">
            <label class="d-block"><b>Introduction:</b></label>
            <b-form-textarea v-model="book.intro"/>
        </div>
        <template v-slot:modal-footer>
            <p>{{result}}</p>
            <b-button v-if="!committing" variant="primary" @click="handleCommit">Commit</b-button>
            <b-spinner v-else/>
        </template>
    </b-modal>
</div>
</template>

<script>
import Const from "@/constants/Const";
import BookRequest from "@/requests/BookRequest";
import Book from "@/util/Book";
import Util from "@/util/Util";

export default {
    name: "AddBook",
    data() {
        return {
            book: {
                isbn: "",
                title: "",
                author: "",
                lang: "",
                press: "",
                date: Const.EPOCH,
                intro: "",
                file: null,
                price: 0,
                stock: 0
            },
            correct: {
                isbn: null,
                file: null,
                price: null,
                stock: null
            },
            committing: false,
            result: ""
        };
    },
    methods: {
        show() {
            this.$refs["modal"].show();
        },
        handleCommit() {
            if (!this.check())
                return;
            this.committing = true;
            let reader = new FileReader();
            reader.addEventListener("load", () => {
                this.commit(reader.result);
            });
            reader.addEventListener("error", () => {
                reader.abort();
                this.committing = false;
                this.correct.file = false;
            });
            reader.readAsDataURL(this.book.file);
        },
        check() {
            this.correct.isbn = this.correct.file = this.correct.price = this.correct.stock = null;
            if (!Util.isValidISBN(this.book.isbn))
                this.correct.isbn = false;
            if (this.book.file === null)
                this.correct.file = false;
            if (!Number.isInteger(this.book.price) || this.book.price < 0 || this.book.price > 2147483647)
                this.correct.price = false;
            if (!Number.isInteger(this.book.stock) || this.book.stock < 0 || this.book.stock > 2147483647)
                this.correct.stock = false;
            return this.correct.isbn === null && this.correct.file === null
                && this.correct.price === null && this.correct.stock === null;
        },
        commit(cover) {
            BookRequest.addBook(
                new Book(this.book.isbn, this.book.title, this.book.author, this.book.lang, this.book.press,
                    this.book.date, this.book.intro, cover, this.book.price, this.book.stock),
                (msg) => {
                    this.committing = false;
                    if (msg.status === "UNKNOWN_HTTP_ERROR")
                        this.result = "Error";
                    else if (msg.status === "UNAUTHORIZED")
                        this.result = "Please sign in";
                    else if (msg.status === "NONPRIVILEGED")
                        this.result = "You are not an administrator";
                    else if (msg.status === "DUP_ISBN")
                        this.result = "The book already exists";
                    else
                        this.result = "The operation succeeds";
                }
            );
        }
    }
};
</script>

<style scoped>
.add-book {
    min-width: 500px;
    max-width: 500px;
}
.add-book-input {
    min-width: 300px;
    max-width: 300px;
}
</style>
