<template>
<div class="edit-book">
    <b-button class="edit-book-button" block variant="secondary" @click="handleEdit">
        Edit the information
    </b-button>
    <info-editor :book="book" ref="book-editor"/>
</div>
</template>

<script>
import {BButton} from "bootstrap-vue";
import InfoEditor from "@/components/InfoEditor";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.min.css";

export default {
    name: "EditBook",
    props: ["book"],
    components: {
        "b-button": BButton,
        "info-editor": InfoEditor
    },
    methods: {
        handleEdit: function() {
            this.$refs["book-editor"].show();
        }
    }
};
</script>

<style scoped>
.edit-book .edit-book-button {
    min-width: 250px;
    max-width: 250px;
}
</style>
