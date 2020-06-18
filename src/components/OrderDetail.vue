<template>
  <div class="order-detail">
    <h5>Shipping Address</h5>
    <p>
      {{ `${order.consignee.firstName} ${order.consignee.lastName}` }}<br/>
      {{ order.consignee.address }}<br/>
      {{ order.consignee.phone }}
    </p>
    <h5>Items</h5>
    <b-table :items="order.items" :fields="fields"
             striped small borderless outlined>
      <template v-slot:cell(ISBN)="row">
        {{ row.item.book.isbn }}
      </template>
      <template v-slot:cell(title)="row">
        {{ row.item.book.title }}
      </template>
      <template v-slot:cell(price)="row">
        &yen;{{ (row.item.price / 100).toFixed(2) }}
      </template>
      <template v-slot:cell(amount)="row">
        {{ row.item.amount }}
      </template>
    </b-table>
  </div>
</template>

<script>
  export default {
    name: 'OrderDetail',
    props: {
      id: String,
      order: Object,
    },
    data() {
      return {
        fields: ['ISBN', 'title', 'price', 'amount'],
      };
    },
  };
</script>

<style scoped>
</style>
