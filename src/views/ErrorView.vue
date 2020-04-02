<template>
<div>
    <nav-bar/>
    <h1 class="error-view h2">{{decodeURI($route.params.err)}}</h1>
</div>
</template>

<script>
import NavBar from "@/components/NavBar";

export default {
    name: "ErrorView",
    components: {
        "nav-bar": NavBar
    }
};
</script>

<style scoped>
.error-view {
    min-width: fit-content;
}
</style>