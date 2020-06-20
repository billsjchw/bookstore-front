<template>
  <div class="add-book-form">
    <div class="d-flex justify-content-center">
      <h2>Add Book</h2>
    </div>
    <div class="mt-2">
      <label>ISBN</label>
      <b-form-group :invalid-feedback="invalidFeedback.isbn">
        <b-form-input type="text" v-model="model.isbn" :state="state.isbn"/>
      </b-form-group>
    </div>
    <div class="mt-2">
      <label>Title</label>
      <b-form-group :invalid-feedback="invalidFeedback.title">
        <b-form-input type="text" v-model="model.title" :state="state.title"/>
      </b-form-group>
    </div>
    <div class="mt-2">
      <label>Author</label>
      <b-form-group :invalid-feedback="invalidFeedback.author">
        <b-form-input type="text" v-model="model.author" :state="state.author"/>
      </b-form-group>
    </div>
    <div class="mt-2">
      <label>Language</label>
      <b-form-group :invalid-feedback="invalidFeedback.lang">
        <b-form-input type="text" v-model="model.lang" :state="state.lang"/>
      </b-form-group>
    </div>
    <div class="mt-2">
      <label>Press</label>
      <b-form-group :invalid-feedback="invalidFeedback.press">
        <b-form-input type="text" v-model="model.press" :state="state.press"/>
      </b-form-group>
    </div>
    <div class="mt-2">
      <label>Publication Date</label>
      <b-form-group :invalid-feedback="invalidFeedback.date">
        <b-form-input type="date" v-model="model.date" :state="state.date"/>
      </b-form-group>
    </div>
    <div class="mt-2">
      <label>Price (cent)</label>
      <b-form-group :invalid-feedback="invalidFeedback.price">
        <b-form-input type="number" number v-model="model.price" :state="state.price"/>
      </b-form-group>
    </div>
    <div class="mt-2">
      <label>Stock</label>
      <b-form-group :invalid-feedback="invalidFeedback.stock">
        <b-form-input type="number" number v-model="model.stock" :state="state.stock"/>
      </b-form-group>
    </div>
    <div class="mt-2">
      <label>Cover</label>
      <b-form-group :invalid-feedback="invalidFeedback.coverFile">
        <b-form-file accept=".jpg" v-model="model.coverFile" :state="state.coverFile"/>
      </b-form-group>
    </div>
    <div class="mt-2">
      <label>Introduction</label>
      <b-form-group :invalid-feedback="invalidFeedback.introData">
        <b-form-textarea v-model="model.introData" :state="state.introData"/>
      </b-form-group>
    </div>
    <b-button @click="handleSubmit" :disabled="submitting" block
              variant="primary" size="lg" class="mt-2">
      Submit
    </b-button>
  </div>
</template>

<script>
  import util from '@/utils/util';
  import book_service from '@/services/book_service';
  import constant from '@/utils/constant';

  export default {
    name: "AddBookForm",
    data() {
      return {
        submitting: false,
        model: {
          isbn: '',
          title: '',
          author: '',
          lang: '',
          press: '',
          date: constant.Misc.UNIX_EPOCH,
          price: 0,
          stock: 0,
          coverFile: null,
          introData: '',
        },
        state: {
          isbn: null,
          title: null,
          author: null,
          lang: null,
          press: null,
          date: null,
          price: null,
          stock: null,
          coverFile: null,
          introData: null,
        },
        invalidFeedback: {
          isbn: '',
          title: '',
          author: '',
          lang: '',
          press: '',
          date: '',
          price: '',
          stock: '',
          coverFile: '',
          introData: '',
        }
      };
    },
    methods: {
      handleSubmit() {
        if (this.submitting)
          return;
        if (!this.validationCheck())
          return;
        this.submitting = true;
        let book = {
          id: null,
          isbn: this.model.isbn,
          title: this.model.title,
          author: this.model.author,
          lang: this.model.lang,
          press: this.model.press,
          date: this.model.date,
          price: this.model.price,
          stock: this.model.stock,
          cover: { bookId: null, data: null },
          intro: { bookId: null, data: this.model.introData },
        };
        let reader = new FileReader();
        reader.addEventListener('load', () => {
          book.cover.data = reader.result;
          book_service.addBook(book, (msg) => {
            if (msg.status === 'SUCCESS') {
              this.$router.push(`/book/${msg.data.id}`);
            }
            this.submitting = false;
          });
        });
        reader.addEventListener('error', () => {
          reader.abort();
          this.submitting = false;
        });
        reader.readAsDataURL(this.model.coverFile);
      },
      validationCheck() {
        this.state.isbn = null;
        this.state.title = null;
        this.state.author = null;
        this.state.lang = null;
        this.state.press = null;
        this.state.date = null;
        this.state.price = null;
        this.state.stock = null;
        this.state.coverFile = null;
        this.state.introData = null;
        if (!util.isIsbn(this.model.isbn)) {
          this.state.isbn = false;
          this.invalidFeedback.isbn = 'Invalid ISBN';
        }
        if (!this.model.title) {
          this.state.title = false;
          this.invalidFeedback.title = 'Title cannot be empty';
        }
        if (!this.model.author) {
          this.state.author = false;
          this.invalidFeedback.author = 'Author cannot be empty';
        }
        if (!this.model.lang) {
          this.state.lang = false;
          this.invalidFeedback.lang = 'Language cannot be empty';
        }
        if (!this.model.press) {
          this.state.press = false;
          this.invalidFeedback.press = 'Press cannot be empty';
        }
        if (!util.isInt(this.model.price) || this.model.price < 0) {
          this.state.price = false;
          this.invalidFeedback.price = 'Price should be a non-negative integer'
        }
        if (!util.isInt(this.model.stock) || this.model.stock < 0) {
          this.state.price = false;
          this.invalidFeedback.price = 'Stock should be a non-negative integer'
        }
        if (!this.model.coverFile) {
          this.state.coverFile = false;
          this.invalidFeedback.coverFile = 'No cover file chosen';
        } else if (this.model.coverFile.type !== 'image/jpeg') {
          this.state.coverFile = false;
          this.invalidFeedback.coverFile = 'Cover file should be a jpeg image';
        }
        if (!this.model.introData) {
          this.state.introData = false;
          this.invalidFeedback.introData = 'Introduction cannot be empty';
        }
        return this.state.isbn === null &&
          this.state.title === null &&
          this.state.author === null &&
          this.state.lang === null &&
          this.state.press === null &&
          this.state.date === null &&
          this.state.price === null &&
          this.state.stock === null &&
          this.state.coverFile === null &&
          this.state.introData === null;
      }
    },
  };
</script>

<style scoped>
  .add-book-form {
    min-width: 600px;
    max-width: 600px;
  }
</style>
