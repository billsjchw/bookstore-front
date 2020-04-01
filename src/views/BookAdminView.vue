<template>
<div class="book-admin-view">
    <book-manager per-page="5"/>
</div>
</template>

<script>
import BookManager from "@/components/BookManager";

export default {
    name: "BookAdminView",
    components: {
        "book-manager": BookManager
    }
};
</script>

<style scoped>
.book-admin-view {
    min-width: fit-content;
}
</style>