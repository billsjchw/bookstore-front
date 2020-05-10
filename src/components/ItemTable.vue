<template>
<div class="item-table">
    <b-table
        :fields="fields"
        :items="items"
        striped
    >
        <template v-slot:cell(book)="row">
            <div class="item-table-cell d-flex">
                <img class="item-table-cover d-block" :src="row.item.book.cover.data"/>
                <div class="d-flex flex-column justify-content-center ml-2">
                    <h6 class="m-0">{{ row.item.book.title }}</h6>
                    <p class="m-0">
                        {{ row.item.book.author }}<br/>
                        {{ row.item.book.press }}
                    </p>
                </div>
            </div>
        </template>
        <template v-slot:cell(price)="row">
            <div class="item-table-cell d-flex flex-column justify-content-center">
                &yen;{{ (row.item.book.price / 100).toFixed(2) }}
            </div>
        </template>
        <template v-slot:cell(num)="row">
            <div class="item-table-cell d-flex flex-column justify-content-center">
                &times;{{ row.item.amount }}
            </div>
        </template>
        <template v-slot:cell(total)="row">
            <div class="item-table-cell d-flex flex-column justify-content-center">
                &yen;{{ (row.item.book.price * row.item.amount / 100).toFixed(2) }}
            </div>
        </template>
    </b-table>
</div>
</template>

<script>
export default {
    name: "ItemTable",
    props: ["items"],
    data() {
        return {
            fields: [
                {key: "book", label: "Book"},
                {key: "price", label: "Price"},
                {key: "num", label: "Number"},
                {key: "total", label: "Total"}
            ]
        };
    }
};
</script>

<style scoped>
.item-table {
    min-width: 800px;
    max-width: 800px;
}

.item-table .item-table-cell {
    min-height: 120px;
    max-height: 120px;
}

.item-table .item-table-cover {
    min-height: 120px;
    max-height: 120px;
}
</style>
