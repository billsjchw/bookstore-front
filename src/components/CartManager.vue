<template>
  <div class="cart-manager">
    <div v-if="loading">
      <b-spinner/>
    </div>
    <div v-else-if="error">
      <p>Failed to load the cart</p>
    </div>
    <div v-else-if="!totalItems">
      <div class="cart-manager__empty-cart d-flex flex-column">
        <h2 class="align-self-start">Your Cart</h2>
        <p class="align-self-center">Your cart is empty</p>
      </div>
    </div>
    <div v-else>
      <div class="d-flex flex-column align-items-center">
        <h2 class="align-self-start">Your Cart</h2>
        <div v-for="(_, index) of cart.items"
             v-show="!removed[index]" :key="index">
          <cart-item-card v-model="cart.items[index]"
                          @remove="handleRemoveItem"/>
        </div>
        <h5 class="align-self-end">
          Total Price: &yen;{{ (totalPrice / 100).toFixed(2) }}
        </h5>
        <b-button href="/checkout" variant="primary"
                  class="align-self-end cart-manager__go-to-checkout-text">
          GO TO CHECKOUT
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
  import cart_service from '@/services/cart_service';
  import CartItemCard from '@/components/CartItemCard';

  export default {
    name: 'CartManager',
    components: {
      'cart-item-card': CartItemCard,
    },
    data() {
      return {
        loading: true,
        error: false,
        cart: null,
        removed: [],
      };
    },
    computed: {
      totalPrice() {
        return this.cart.items.reduce(
          (acc, cartItem, index) => {
            if (!this.removed[index] && cartItem.active)
              return acc + cartItem.amount * cartItem.book.price;
            else
              return acc;
          },
          0,
        );
      },
      totalItems() {
        return this.removed.reduce(
          (acc, cur) => cur ? acc : acc + 1,
          0,
        );
      },
    },
    created() {
      cart_service.findMyCart((msg) => {
        if (msg.status === 'SUCCESS') {
          this.cart = msg.data;
          this.removed = new Array(msg.data.items.length).fill(false);
        } else {
          this.error = true;
        }
        this.loading = false;
      });
    },
    methods: {
      handleRemoveItem(cartItem) {
        for (let i = 0; i < this.cart.items.length; ++i)
          if (this.cart.items[i].book.id === cartItem.book.id) {
            this.$set(this.removed, i, true);
            break;
          }
      },
    },
  };
</script>

<style scoped>
  .cart-manager {
    max-width: fit-content;
  }
  .cart-manager__empty-cart {
    min-width: 576px;
    max-width: 576px;
  }
  .cart-manager__go-to-checkout-text {
    font-size: 15px;
  }
</style>
