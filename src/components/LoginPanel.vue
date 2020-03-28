<template>
<div class="login-panel d-flex flex-column align-items-center">
    <img class="login-panel-logo mb-3" :src="require('../assets/icons/books.png')" alt="books"/>
    <h1 class="login-panel-title h3 mb-3">e-Book</h1>
    <div class="w-100 mb-3">
        <b-form-input class="login-panel-username" size="lg" type="text" placeholder="Username" v-model="username"/>
        <b-form-input class="login-panel-password" size="lg" type="password" placeholder="Password" v-model="password"/>
    </div>
    <b-button block size="lg" variant="primary" @click="handleCommit">Sign in</b-button>
    <div class="mt-5 mb-3"></div>
</div>
</template>

<script>
import {BButton, BFormInput} from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.min.css";

export default {
    name: "LoginPanel",
    components: {
        "b-button": BButton,
        "b-form-input": BFormInput
    },
    data: function() {
        return {
            username: "",
            password: ""
        };
    },
    methods: {
        handleCommit: function() {
            console.log(`Login: username="${this.username}", password="${this.password}"`);
            window.location.href = "/books";
        }
    }
};
</script>

<style>
.login-panel {
    min-width: 300px;
    max-width: 300px;
}
.login-panel .login-panel-logo {
    height: 80px;
    width: 80px;
}
.login-panel .login-panel-title {
    font-family: "Book Antiqua";
}
.login-panel .login-panel-username {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    font-size: 16px;
}
.login-panel .login-panel-password {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    font-size: 16px;
}
</style>
