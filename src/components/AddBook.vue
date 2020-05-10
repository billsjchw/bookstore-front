<template>
<div>
    <b-modal class="add-book" scrollable no-close-on-backdrop title="Add a Book" ref="modal">
        <div class="d-flex justify-content-between">
            <label class="d-block"><b>ISBN:</b></label>
            <b-form-input class="add-book-input" type="introData" v-model="book.isbn"
                          :state="correct.isbn" @change="correct.isbn = null"/>
        </div>
        <div class="d-flex justify-content-between mt-2">
            <label class="d-block"><b>Title:</b></label>
            <b-form-input class="add-book-input" type="introData" v-model="book.title"/>
        </div>
        <div class="d-flex justify-content-between mt-2">
            <label class="d-block"><b>Author:</b></label>
            <b-form-input class="add-book-input" type="introData" v-model="book.author"/>
        </div>
        <div class="d-flex justify-content-between mt-2">
            <label class="d-block"><b>Language:</b></label>
            <b-form-input class="add-book-input" type="introData" v-model="book.language"/>
        </div>
        <div class="d-flex justify-content-between mt-2">
            <label class="d-block"><b>Press:</b></label>
            <b-form-input class="add-book-input" type="introData" v-model="book.press"/>
        </div>
        <div class="d-flex justify-content-between mt-2">
            <label class="d-block"><b>Publication Date:</b></label>
            <b-form-input class="add-book-input" type="date" v-model="book.date"/>
        </div>
        <div class="d-flex justify-content-between mt-2">
            <label class="d-block"><b>Cover:</b></label>
            <b-form-file class="add-book-input" accept=".jpg" placeholder="No file chosen"
                         v-model="book.coverFile" :state="correct.coverFile" @change="correct.coverFile = null"/>
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
            <label class="d-block"><b>introData:</b></label>
            <b-form-textarea v-model="book.introData"/>
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
import Util from "@/util/Util";

export default {
    name: "AddBook",
    data() {
        return {
            book: {
                isbn: "",
                title: "",
                author: "",
                language: "",
                press: "",
                date: Const.EPOCH,
                price: 0,
                stock: 0,
                coverFile: null,
                introData: ""
            },
            correct: {
                isbn: null,
                price: null,
                stock: null,
                coverFile: null
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
                this.correct.coverFile = false;
            });
            reader.readAsDataURL(this.book.coverFile);
        },
        check() {
            this.correct.isbn = this.correct.coverFile = this.correct.price = this.correct.stock = null;
            if (!Util.isValidISBN(this.book.isbn))
                this.correct.isbn = false;
            if (this.book.coverFile === null)
                this.correct.coverFile = false;
            if (!Number.isInteger(this.book.price) || this.book.price < 0 || this.book.price > 2147483647)
                this.correct.price = false;
            if (!Number.isInteger(this.book.stock) || this.book.stock < 0 || this.book.stock > 2147483647)
                this.correct.stock = false;
            return this.correct.isbn === null && this.correct.coverFile === null
                && this.correct.price === null && this.correct.stock === null;
        },
        commit(coverData) {
            BookRequest.addBook(
                {
                    isbn: this.book.isbn,
                    title: this.book.title,
                    author: this.book.author,
                    language: this.book.language,
                    press: this.book.press,
                    date: this.book.date,
                    price: this.book.price,
                    stock: this.book.stock,
                    cover: { isbn: this.book.isbn, data: coverData },
                    introduction: { isbn: this.book.isbn, data: this.book.introData }
                },
                (msg) => {
                    this.committing = false;
                    if (msg.status === "UNAUTHORIZED")
                        this.result = "Please sign in";
                    else if (msg.status === "REJECTED")
                        this.result = "You are not an administrator";
                    else if (msg.status === "DUP_ISBN")
                        this.result = "The book already exists";
                    else if (msg.status !== "SUCCESS")
                        this.result = "Unknown error";
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
