<template>
<div class="add-to-cart d-flex">
    <b-form-spinbutton min="1" max="200" v-model="num"/>
    <b-button class="ml-1" variant="primary" block @click="handleCommit">Add to cart</b-button>
</div>
</template>

<script>
export default {
    name: "AddToCart",
    props: ["isbn"],
    data() {
        return {
            num: 1
        };
    },
    methods: {
        handleCommit() {
            console.log(`Add to cart: isbn=${this.isbn}, num=${this.num}`);
            this.$bvToast.toast(
                `The book${this.num > 1 ? "s have" : " has"} been added to your cart`,
                {
                    title: "Success",
                    variant: "success",
                    autoHideDelay: 3500
                }
            );
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