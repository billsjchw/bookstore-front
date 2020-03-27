<template>
<div class="add-to-cart d-flex">
    <b-form-spinbutton min="1" max="200" v-model="num"/>
    <b-button class="ml-1" variant="primary" block @click="handleCommit">Add to cart</b-button>
</div>
</template>

<script>
import {BFormSpinbutton, BButton} from "bootstrap-vue";

export default {
    name: "AddToCart",
    props: ["isbn"],
    components: {
        "b-form-spinbutton": BFormSpinbutton,
        "b-button": BButton
    },
    data: function() {
        return {
            num: 1
        };
    },
    methods: {
        handleCommit: function() {
            console.log(`Add to cart: isbn=${this.isbn}, num=${this.num}`);
        }
    }
};
</script>

<style scoped>
.add-to-cart {
    min-width: 250px;
    max-width: 250px;
}
</style>