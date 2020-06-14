<template>
  <div class="add-to-cart d-flex align-items-center">
    <div>
      <b-button @click="handleClick" :disabled="loading"
                variant="primary" class="add-to-cart">
        <span class="add-to-cart__button-text">ADD TO CART</span>
      </b-button>
    </div>
    <div class="ml-2">
      <b-icon icon="cart4"/> <b-badge variant="secondary">{{ amount }}</b-badge>
    </div>
  </div>
</template>

<script>
  import cart_service from '@/services/cart_service';

  export default {
    name: 'AddToCart',
    props: {
      bookId: Number,
    },
    data() {
      return {
        amount: 0,
        loading: true,
      };
    },
    created() {
      cart_service.findItemInMyCart(this.bookId, (msg) => {
        if (msg.status === 'SUCCESS')
          this.amount = msg.data.amount;
        this.loading = false;
      });
    },
    methods: {
      handleClick() {
        if (this.loading)
          return;
        cart_service.addBookToMyCart(this.bookId, (msg) => {
          if (msg.status === 'SUCCESS')
            this.amount = msg.data.amount;
          else if (msg.status === 'UNAUTHORIZED')
            this.$bvToast.toast(
              'Please sign in first',
              { variant: 'danger', title: 'Add to cart - Failed' }
            );
          else if (msg.status === 'BOOK_NOT_FOUND')
            this.$bvToast.toast(
              'Book not found',
              { variant: 'danger', title: 'Add to cart - Failed' }
            );
          else if (msg.status === 'MAX_AMOUNT_EXCEEDED')
            this.$bvToast.toast(
              'Max amount exceeded',
              { variant: 'danger', title: 'Add to cart - Failed' }
            );
          else
            this.$bvToast.toast(
              'Unknown error',
              { variant: 'danger', title: 'Add to cart - Failed' }
            );
          this.loading = false;
        });
      },
    },
  };
</script>

<style scoped>
  .add-to-cart__button-text {
    font-size: 15px;
  }
</style>
