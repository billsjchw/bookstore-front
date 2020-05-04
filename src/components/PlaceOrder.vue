<template>
    <b-button variant="primary" @click="handleCommit">Place order</b-button>
</template>

<script>
import OrderRequest from "@/requests/OrderRequest";

export default {
    name: "PlaceOrder",
    methods: {
        handleCommit() {
            OrderRequest.placeOrder(msg => {
                if (msg.status === "UNAUTHORIZED")
                    window.location.href = "/login";
                else if (msg.status === "EMPTY_CART")
                    this.$bvToast.toast(
                        "Your cart is empty",
                        {
                            title: "Place order - Failure",
                            variant: "danger",
                            autoHideDelay: 3500
                        }
                    );
                else if (msg.status === "OUT_OF_STOCK")
                    this.$bvToast.toast(
                        `${msg.data.title} (isbn=${msg.data.isbn}) is out of stock`,
                        {
                            title: "Place order - Failure",
                            variant: "danger",
                            autoHideDelay: 3500
                        }
                    );
                else if (msg.status !== "SUCCESS")
                    this.$bvToast.toast(
                        "Unknown error",
                        {
                            title: "Place order - Failure",
                            variant: "danger",
                            autoHideDelay: 3500
                        }
                    );
                else
                    window.location.href = "/orders";
            });
        }
    }
};
</script>
