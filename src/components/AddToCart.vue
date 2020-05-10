<template>
<div class="add-to-cart d-flex">
    <b-form-spinbutton min="1" max="200" v-model="increment"/>
    <b-button class="ml-1" variant="primary" block @click="handleCommit">Add to cart</b-button>
</div>
</template>

<script>
import CartRequest from "@/requests/CartRequest";

export default {
    name: "AddToCart",
    props: ["isbn"],
    data() {
        return {
            increment: 1
        };
    },
    methods: {
        handleCommit() {
            CartRequest.addToCart(this.isbn, this.increment, msg => {
                if (msg.status === "UNAUTHORIZED")
                    window.location.href = "/login";
                else if (msg.status === "BOOK_NOT_FOUND")
                    this.$bvToast.toast(
                        "Book not found",
                        {
                            title: "Add to cart - Failure",
                            variant: "danger",
                            autoHideDelay: 3500
                        }
                    );
                else if (msg.status === "OVERFLOW")
                    this.$bvToast.toast(
                        "Overflow",
                        {
                            title: "Add to cart - Failure",
                            variant: "danger",
                            autoHideDelay: 3500
                        }
                    );
                else if (msg.status !== "SUCCESS")
                    this.$bvToast.toast(
                        "Unknown error",
                        {
                            title: "Add to cart - Failure",
                            variant: "danger",
                            autoHideDelay: 3500
                        }
                    );
                else
                    this.$bvToast.toast(
                        "Success",
                        {
                            title: "Add to cart - Success",
                            variant: "success",
                            autoHideDelay: 3500
                        }
                    );
            });
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
