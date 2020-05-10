<template>
<div class="book-info">
    <h1>{{book.title}}</h1>
    <p><b>Author:</b> {{book.author}}</p>
    <p><b>Price:</b> &yen;{{(book.price / 100).toFixed(2)}}</p>
    <p><b>Stock:</b> {{book.stock}}</p>
    <p><b>ISBN:</b> {{book.isbn}}</p>
    <p><b>Language:</b> {{book.language}}</p>
    <p><b>Press:</b> {{book.press}}</p>
    <p><b>Publication date:</b> {{book.date}}</p>
    <p>
        <b>Introduction:</b><br/>
        <span v-html="book.introduction.data.replace(/\n/g, '\u003cbr/\u003e')"/>
    </p>
</div>
</template>

<script>
export default {
    name: "BookInfo",
    props: ["book"]
};
</script>

<style scoped>
.book-info {
    min-width: 700px;
    max-width: 700px;
}
</style>