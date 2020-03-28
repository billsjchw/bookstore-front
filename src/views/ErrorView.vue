<template>
<div>
    <h1 class="error-view h2">{{decodeURI($route.params.err)}}</h1>
</div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";

export default {
    name: "ErrorView"
};
</script>

<style scoped>
.error-view {
    min-width: fit-content;
}
</style>