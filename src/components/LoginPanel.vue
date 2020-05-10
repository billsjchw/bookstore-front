<template>
<div class="login-panel d-flex flex-column align-items-center">
    <img class="login-panel-logo mb-3" :src="require('../assets/icons/books.png')" alt="books"/>
    <h1 class="h3 mb-3">Bookstore</h1>
    <div class="w-100 mb-3">
        <b-form-input class="login-panel-username" size="lg" type="text" placeholder="Username" v-model="username"/>
        <b-form-input class="login-panel-password" size="lg" type="password" placeholder="Password" v-model="password"/>
    </div>
    <b-button block size="lg" variant="primary" @click="handleCommit">Sign in</b-button>
    <div class="mt-3 mb-5"><a href="/register">Create an account</a></div>
</div>
</template>

<script>
import LoginRequest from "@/requests/LoginRequest";

export default {
    name: "LoginPanel",
    data() {
        return {
            username: "",
            password: ""
        };
    },
    methods: {
        handleCommit() {
            let user = btoa(`${this.username}:${this.password}`);
            sessionStorage.setItem("user", user);
            LoginRequest.login((msg) => {
                if (msg.status === "SUCCESS") {
                    sessionStorage.setItem("authorities", JSON.stringify(msg.data));
                    window.location.href = "/books";
                } else if (msg.status === "UNAUTHORIZED") {
                    sessionStorage.removeItem("user");
                    this.$bvToast.toast(
                        "Wrong username/password",
                        {
                            title: "Sign in - Failure",
                            variant: "danger",
                            autoHideDelay: 2500
                        }
                    );
                } else {
                    sessionStorage.removeItem("user");
                    this.$bvToast.toast(
                        "Unknown error",
                        {
                            title: "Sign in - Failure",
                            variant: "danger",
                            autoHideDelay: 2500
                        }
                    );
                }
            });
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
