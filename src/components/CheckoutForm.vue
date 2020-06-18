<template>
  <div class="checkout-form">
    <h4>Shipping Address</h4>
    <div class="d-flex mt-2">
      <div class="flex-fill">
        <label>First name</label>
        <b-form-input type="text" v-model="consignee.firstName"/>
      </div>
      <div class="ml-3 flex-fill">
        <label>Last name</label>
        <b-form-input type="text" v-model="consignee.lastName"/>
      </div>
    </div>
    <div class="mt-3">
      <label>Address</label>
      <b-form-input type="text" v-model="consignee.address"/>
    </div>
    <div class="mt-3">
      <label>Phone number</label>
      <b-form-input type="tel" v-model="consignee.phone"/>
    </div>
    <hr class="mt-4"/>
    <h4 class="mt-3">Payment</h4>
    <b-form-radio-group :options="paymentMethodOptions" v-model="paymentMethod" buttons
                        button-variant="outline-secondary" class="mt-3"/>
    <hr class="mt-4"/>
    <div class="d-flex justify-content-center">
      <b-button :disabled="loading" @click="handleSubmit"
                block variant="primary" size="lg">
        Continue to checkout
      </b-button>
    </div>
  </div>
</template>

<script>
  import order_service from '@/services/order_service';

  export default {
    name: 'CheckoutForm',
    data() {
      return {
        loading: false,
        consignee: {
          firstName: '',
          lastName: '',
          address: '',
          phone: '',
        },
        paymentMethod: 'ONLINE',
        paymentMethodOptions: [
          { text: 'Online payment', value: 'ONLINE' },
          { text: 'Cash on delivery', value: 'COD' },
        ],
      };
    },
    methods: {
      handleSubmit() {
        if (this.loading)
          return;
        this.loading = true;
        order_service.orderItemsInMyCart(this.consignee, this.paymentMethod, (msg) => {
          if (msg.status === 'SUCCESS')
            this.$router.push('/orders');
          else if (msg.status === 'UNAUTHORIZED')
            this.$bvToast.toast(
              'Please sign in first',
              { variant: 'danger', title: 'Place order - Failed'},
            );
          else if (msg.status === 'NOTHING_TO_ORDER')
            this.$bvToast.toast(
              'Your cart is empty',
              { variant: 'danger', title: 'Place order - Failed'},
            );
          else if (msg.status === 'OUT_OF_STOCK')
            this.$bvToast.toast(
              `${msg.data.title} is out of stock (stock: ${msg.data.stock})`,
              { variant: 'danger', title: 'Place order - Failed'},
            );
          else
            this.$bvToast.toast(
              'Unknown error',
              { variant: 'danger', title: 'Place order - Failed'},
            );
          this.loading = false;
        });
      },
    },
  };
</script>

<style scoped>
  .checkout-form {
    min-width: 550px;
    max-width: 550px;
  }
</style>
