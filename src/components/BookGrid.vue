<template>
<div>
    <div v-for="(row, r) in rows" class="d-flex" :key="r">
        <book-card v-for="(book, c) in row" :book="book" :key="c"/>
    </div>
</div>
</template>

<script>
import BookCard from "@/components/BookCard";

export default {
    name: "BookGrid",
    props: ["books", "colNum"],
    components: {
        "book-card": BookCard
    },
    computed: {
        rows() {
            let rows = [];
            for (let i = 0; i < this.books.length; i += this.colNum)
                rows.push(this.books.slice(i, i + this.colNum));
            return rows;
        }
    }
};
</script>
