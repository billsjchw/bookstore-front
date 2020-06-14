<template>
  <div class="login-view h-100 d-flex justify-content-center align-items-center">
    <login-form/>
  </div>
</template>

<script>
  import LoginForm from '@/components/LoginForm';

  export default {
    name: 'LoginView',
    components: {
      "login-form": LoginForm,
    },
  };
</script>

<style scoped>
  .login-view {
    min-width: fit-content;
  }
</style>
