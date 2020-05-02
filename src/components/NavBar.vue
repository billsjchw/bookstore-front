<template>
<div class="nav-bar">
    <b-navbar type="light" variant="light">
        <b-navbar-brand class="h1 mb-0" href="/">
            Bookstore
        </b-navbar-brand>
        <b-navbar-nav>
            <b-nav-item href="/books" :active="activeItem === 'books'">&#128218;Books</b-nav-item>
            <b-nav-item href="/cart" :active="activeItem === 'cart'">&#128722;Cart</b-nav-item>
            <b-nav-item href="/orders" :active="activeItem === 'orders'">&#128203;Orders</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
                <template v-slot:button-content>
                    <b-avatar class="nav-bar-avatar" variant="light" :src="require('../assets/icons/avatar.png')"/>
                </template>
                <b-dropdown-item href="/profile">Profile</b-dropdown-item>
                <b-dropdown-item @click="handleSignOut">Sign out</b-dropdown-item>
                <b-dropdown-divider/>
                <b-dropdown-group header="Administration">
                    <b-dropdown-item href="/user-admin">Users</b-dropdown-item>
                    <b-dropdown-item href="/book-admin">Books</b-dropdown-item>
                </b-dropdown-group>
            </b-nav-item-dropdown>
        </b-navbar-nav>
    </b-navbar>
</div>
</template>

<script>
import LogoutRequest from "@/requests/LogoutRequest";

export default {
    name: "NavBar",
    props: ["activeItem"],
    methods: {
        handleSignOut() {
            LogoutRequest.logout(() => {
                sessionStorage.removeItem("user");
                sessionStorage.removeItem("role");
                window.location.href = "/login";
            })
        }
    }
};
</script>

<style>
.nav-bar .nav-bar-avatar {
    min-width: 2em;
    max-width: 2em;
    min-height: 2em;
    max-height: 2em;
}
</style>
