<template>
<div class="book-admin-view">
    <nav-bar/>
    <book-manager class="mt-3" per-page="5"/>
</div>
</template>

<script>
import NavBar from "@/components/NavBar";
import BookManager from "@/components/BookManager";

export default {
    name: "BookAdminView",
    components: {
        "nav-bar": NavBar,
        "book-manager": BookManager
    }
};
</script>

<style scoped>
.book-admin-view {
    min-width: fit-content;
}
</style>