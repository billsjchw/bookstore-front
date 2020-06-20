<template>
  <div class="checkout-view">
    <nav-bar/>
    <div class="d-flex justify-content-center mt-3">
      <h2>Checkout</h2>
    </div>
    <div class="d-flex justify-content-center mt-2 mb-3">
      <checkout-form/>
      <cart-snapshot class="ml-4"/>
    </div>
  </div>
</template>

<script>
  import CheckoutForm from '@/components/CheckoutForm';
  import NavBar from '@/components/NavBar';
  import CartSnapshot from '@/components/CartSnapshot';

  export default {
    name: 'CheckoutView',
    components: {
      'nav-bar': NavBar,
      'checkout-form': CheckoutForm,
      'cart-snapshot': CartSnapshot,
    },
  };
</script>

<style scoped>
  .checkout-view {
    min-width: fit-content;
  }
</style>
