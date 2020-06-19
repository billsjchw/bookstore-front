<template>
  <b-table :items="orders" :fields="fields" bordered class="order-table">
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
      <div class="order-table__icon-wrapper">
        <b-icon @click="row.toggleDetails" icon="three-dots" class="order-table__icon-button d-inline-block"/>
      </div>
    </template>
    <template v-slot:row-details="row">
      <order-detail :order="row.item"/>
    </template>
  </b-table>
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
        fields: [
          { key: 'order_id', label: 'Order ID' },
          { key: 'username', label: 'Username' },
          { key: 'time_placed', label: 'Time Placed' },
          { key: 'total_price', label: 'Total Price' },
          { key: 'payment_method', label: 'Payment Method' },
          { key: 'detail', label: 'Detail' },
        ],
        detailModal: {
          order: null,
        },
      };
    },
  };
</script>

<style scoped>
  .order-table__icon-wrapper {
    text-align: center;
  }
  .order-table__icon-button {
    cursor: pointer;
  }
</style>
