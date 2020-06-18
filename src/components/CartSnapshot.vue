<template>
  <div class="cart-snapshot">
    <div v-if="loading">
      <div class="cart-snapshot__dummy-block">
        <b-spinner/>
      </div>
    </div>
    <div v-else-if="error">
      <p class="cart-snapshot__dummy-block">
        Failed to load your cart
      </p>
    </div>
    <div v-else>
      <h4 class="d-flex justify-content-between">
        <div class="text-muted">Your Cart</div>
        <div>
          <b-badge pill variant="secondary">
            {{ cart.items.length }}
          </b-badge>
        </div>
      </h4>
      <b-list-group>
        <b-list-group-item v-for="(cartItem, index) of cart.items"
                           :key="index">
          <div class="d-flex justify-content-between">
            <div>
              <h6 class="cart-snapshot__book-title">{{ cartItem.book.title }}</h6>
              <div class="cart-snapshot__book-author">
                <small class="text-muted">{{ cartItem.book.author }}</small>
              </div>
            </div>
            <div class="d-flex flex-column align-items-end">
              <div>&yen;{{ (cartItem.book.price / 100).toFixed(2) }}</div>
              <div>&times;{{ cartItem.amount }}</div>
            </div>
          </div>
        </b-list-group-item>
        <b-list-group-item>
          <div class="d-flex justify-content-between">
            <h6>Total Price</h6>
            <div>&yen;{{ (totalPrice / 100).toFixed(2) }}</div>
          </div>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
  import cart_service from '@/services/cart_service';

  export default {
    name: 'CartSnapshot',
    data() {
      return {
        loading: true,
        error: false,
        cart: null,
      };
    },
    created() {
      cart_service.findMyCart((msg) => {
        if (msg.status === 'SUCCESS')
          this.cart = msg.data;
        else
          this.error = true;
        this.loading = false;
      });
    },
    computed: {
      totalPrice() {
        return this.cart.items.reduce(
          (acc, cartItem) => acc + cartItem.book.price * cartItem.amount,
          0,
        );
      },
    },
  };
</script>

<style scoped>
  .cart-snapshot {
    min-width: 280px;
    max-width: 280px;
  }
  .cart-snapshot__dummy-block {
    min-width: 270px;
    max-width: 270px;
  }
  .cart-snapshot__book-title {
    min-width: 160px;
    max-width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .cart-snapshot__book-author {
    min-width: 160px;
    max-width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
