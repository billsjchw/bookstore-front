<template>
  <b-input-group class="search-bar">
    <b-form-input type="text" v-model="keyword"
                  placeholder="Search ..."/>
    <b-input-group-append>
      <b-button @click="handleSearch"
                variant="outline-secondary">🔍</b-button>
    </b-input-group-append>
  </b-input-group>
</template>

<script>
  export default {
    name: "SearchBar",
    data() {
      return {
        keyword: '',
      };
    },
    methods: {
      handleSearch() {
        this.$emit('search', this.keyword);
      },
    },
  };
</script>

<style scoped>
  .search-bar {
    min-width: 500px;
    max-width: 500px;
  }
</style>
