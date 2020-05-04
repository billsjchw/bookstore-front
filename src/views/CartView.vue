<template>
<div>
    <nav-bar active-item="cart"/>
    <div class="d-flex flex-column align-items-center mt-3">
        <item-table :items="items"/>
        <place-order class="float-right"/>
    </div>
</div>
</template>

<script>
import ItemTable from "@/components/ItemTable";
import OrderRequest from "@/requests/OrderRequest";
import NavBar from "@/components/NavBar";
import PlaceOrder from "@/components/PlaceOrder";

export default {
    name: "CartView",
    components: {
        "place-order": PlaceOrder,
        "nav-bar": NavBar,
        "item-table": ItemTable
    },
    data() {
        return {
            items: []
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            OrderRequest.getCart(msg => {
                if (msg.status === "UNAUTHORIZED")
                    window.location.href = "/login";
                else if (msg.status !== "SUCCESS") {
                    alert("Unknown error");
                    window.location.href = "/books";
                } else
                    this.items = msg.data.items;
            });
        }
    }
};
</script>
