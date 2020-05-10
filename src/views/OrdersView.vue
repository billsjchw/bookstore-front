<template>
<div>
    <nav-bar active-item="orders"/>
    <div class="d-flex flex-column align-items-center">
        <div v-for="(order, index) in orders" :key="index">
            <item-table :items="order.items"/>
        </div>
    </div>
</div>
</template>

<script>
import OrderRequest from "@/requests/OrderRequest";
import ItemTable from "@/components/ItemTable";
import NavBar from "@/components/NavBar";

export default {
    name: "OrdersView",
    components: {
        "nav-bar": NavBar,
        "item-table": ItemTable
    },
    data() {
        return {
            orders: []
        };
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            OrderRequest.findAllMyOrders(msg => {
                if (msg.status === "UNAUTHORIZED")
                    window.location.href = "/login";
                else if (msg.status !== "SUCCESS") {
                    alert("Unknown error");
                    window.location.href = "/books";
                } else
                    this.orders = msg.data;
            });
        }
    }
};
</script>
