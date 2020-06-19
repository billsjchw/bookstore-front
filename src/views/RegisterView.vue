<template>
  <div class="register-view d-flex justify-content-center">
    <register-form class="mt-3 mb-3"/>
  </div>
</template>

<script>
  import RegisterForm from '@/components/RegisterForm';

  export default {
    name: 'RegisterView',
    components: {
      'register-form': RegisterForm,
    },
  };
</script>

<style scoped>
  .register-view {
    min-width: fit-content;
  }
</style>
