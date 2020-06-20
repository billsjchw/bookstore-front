<template>
  <div class="order-admin-view">
    <nav-bar/>
    <div class="d-flex justify-content-center mt-3">
      <order-list :page-size="4" :admin="true"/>
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/NavBar';
  import OrderList from '@/components/OrderList';

  export default {
    name: 'OrderAdminView',
    components: {
      'nav-bar': NavBar,
      'order-list': OrderList,
    },
  };
</script>

<style scoped>
  .order-admin-view {
    min-width: fit-content;
  }
</style>
