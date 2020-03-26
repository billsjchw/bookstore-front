<template>
<div class="h-100 d-flex justify-content-center align-items-center bg-light">
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
