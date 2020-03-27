<template>
<div class="login-view h-100 d-flex justify-content-center align-items-center bg-light">
    <login-panel/>
</div>
</template>

<script>
import LoginPanel from "@/components/LoginPanel";

export default {
    name: "LoginView",
    components: {
        "login-panel": LoginPanel
    }
};
</script>

<style scoped>
.login-view {
    min-width: fit-content;
}
</style>
