<template>
<div>
    <b-input-group class="search-bar">
        <b-input-group-prepend>
            <b-dropdown :text="typeName" variant="outline-secondary">
                <b-dropdown-item-button @click="type = 'title'">Title</b-dropdown-item-button>
                <b-dropdown-item-button @click="type = 'author'">Author</b-dropdown-item-button>
                <b-dropdown-item-button @click="type = 'isbn'">ISBN</b-dropdown-item-button>
            </b-dropdown>
        </b-input-group-prepend>
        <b-form-input v-model="text"/>
        <b-input-group-append>
            <b-button variant="outline-success" @click="emitCommit">Search</b-button>
        </b-input-group-append>
    </b-input-group>
</div>
</template>

<script>
export default {
    name: "SearchBar",
    model: {
        prop: "search",
        event: "commit"
    },
    props: ["search"],
    data: function() {
        return {
            type: this.search.type,
            text: this.search.text
        };
    },
    computed: {
        typeName: function() {
            return {
                "title": "Title",
                "author": "Author",
                "isbn": "ISBN"
            }[this.type];
        }
    },
    methods: {
        emitCommit: function() {
            this.$emit(
                "commit",
                {
                    type: this.type,
                    text: this.text
                }
            );
        }
    }
};
</script>

<style scoped>
.search-bar {
    min-width: 600px;
    max-width: 600px;
}
</style>
