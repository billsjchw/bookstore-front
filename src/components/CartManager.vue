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
             v-show="!deleted[index]" :key="index">
          <cart-item-card v-model="cart.items[index]"
                          @delete="handleDeleteItem"/>
        </div>
        <h5 class="align-self-end">
          Total Price: &yen;{{ (totalPrice / 100).toFixed(2) }}
        </h5>
        <div class="align-self-end d-flex align-items-center">
          <span v-if="!activeCartItems.length">Nothing to order</span>
          <b-button @click="handleGoToCheckout" :disabled="!activeCartItems.length" variant="primary"
                    class="cart-manager__go-to-checkout ml-2">
            GO TO CHECKOUT
          </b-button>
        </div>
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
        deleted: [],
      };
    },
    computed: {
      activeCartItems() {
        return this.cart.items.filter((cartItem, index) => cartItem.active && !this.deleted[index]);
      },
      totalPrice() {
        return this.activeCartItems.reduce((acc, cartItem) => acc + cartItem.amount * cartItem.book.price, 0);
      },
      totalItems() {
        return this.deleted.reduce((acc, cur) => cur ? acc : acc + 1, 0);
      },
    },
    created() {
      cart_service.findMyCart((msg) => {
        if (msg.status === 'SUCCESS') {
          this.cart = msg.data;
          this.deleted = new Array(msg.data.items.length).fill(false);
        } else {
          this.error = true;
        }
        this.loading = false;
      });
    },
    methods: {
      handleDeleteItem(cartItem) {
        for (let i = 0; i < this.cart.items.length; ++i)
          if (this.cart.items[i].book.id === cartItem.book.id) {
            this.$set(this.deleted, i, true);
            break;
          }
      },
      handleGoToCheckout() {
        if (!this.activeCartItems.length)
          return;
        this.$router.push('/checkout');
      }
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
  .cart-manager__go-to-checkout {
    font-size: 15px;
  }
</style>
