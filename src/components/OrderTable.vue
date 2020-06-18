<template>
  <div class="order-table">
    <b-table :items="orders" :fields="fields" bordered>
      <template v-slot:cell(order_id)="row">
        {{ row.item.id }}
      </template>
      <template v-slot:cell(username)="row">
        {{ row.item.user.username }}
      </template>
      <template v-slot:cell(time_placed)="row">
        {{ new Date(row.item.timePlaced).toLocaleString() }}
      </template>
      <template v-slot:cell(total_price)="row">
        &yen;{{ (row.item.items.reduce((acc, orderItem) => acc + orderItem.amount * orderItem.price, 0) / 100).toFixed(2) }}
      </template>
      <template v-slot:cell(payment_method)="row">
        {{ { ONLINE: 'Online payment', COD: 'Cash on delivery' }[row.item.paymentMethod] }}
      </template>
      <template v-slot:cell(detail)="row">
        <b-icon @click="row.toggleDetails" icon="three-dots" class="order-table__show-detail d-inline-block"/>
      </template>
      <template v-slot:row-details="row">
        <order-detail :order="row.item"/>
      </template>
    </b-table>
  </div>
</template>

<script>
  import OrderDetail from '@/components/OrderDetail';

  export default {
    name: 'OrderTable',
    props: {
      orders: Array,
    },
    components: {
      'order-detail': OrderDetail,
    },
    data() {
      return {
        fields: ['order_id', 'username', 'time_placed',
            'total_price', 'payment_method', 'detail'],
        detailModal: {
          order: null,
        },
      };
    },
  };
</script>

<style scoped>
  .order-table__show-detail {
    cursor: pointer;
  }
</style>
