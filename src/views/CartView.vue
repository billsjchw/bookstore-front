<template>
  <div class="cart-view">
    <nav-bar/>
    <div class="d-flex justify-content-center mt-3 mb-3">
      <cart-manager/>
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/NavBar';
  import CartManager from '@/components/CartManager';
  export default {
    name: 'CartView',
    components: {
      'nav-bar': NavBar,
      'cart-manager': CartManager,
    },
  };
</script>

<style scoped>
  .cart-view {
    min-width: fit-content;
  }
</style>
