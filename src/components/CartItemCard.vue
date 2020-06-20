<template>
  <div class="cart-item-card d-flex pt-3 pb-3">
    <div>
      <img :src="value.book.cover.data" :alt="value.book.title"
           :rounded="true" class="cart-item-card__cover"/>
    </div>
    <div class="cart-item-card__right d-flex flex-column ml-3">
      <div class="d-flex justify-content-between flex-fill">
        <div class="cart-item-card__book-info">
          <h5 class="cart-item-card__book-title">
            {{ value.book.title }}
          </h5>
          <p class="cart-item-card__book-basic">
            <span>ISBN: {{ value.book.isbn }}</span><br/>
            <span>Author: {{ value.book.author }}</span><br/>
            <span>Press: {{ value.book.press }}</span>
          </p>
        </div>
        <div>
          <div class="h-100 d-flex flex-column justify-content-between align-items-end pl-3">
            <div class="d-flex flex-column align-items-end">
              <b-form-spinbutton v-model="amount" @change="handleAmountChange"
                                 :min="1" :max="200" :disabled="loading"/>
              <b-checkbox v-model="active" @change="handleActiveChange"
                          :disabled="loading" switch size="lg"/>
            </div>
            <div class="cart-item-card__price">
              <strong>&yen;{{ (value.book.price / 100).toFixed(2) }}</strong>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <b-spinner v-if="loading" small/>
          <span v-if="error">{{ errMsg }}</span>
        </div>
        <div @click="handleRemoveItem" class="cart-item-card__remove-item">
          <b-icon icon="trash-fill"/> REMOVE ITEM
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import cart_service from '@/services/cart_service';

  export default {
    name: 'CartItemCard',
    model: {
      prop: 'value',
      event: 'change',
    },
    props: {
      value: Object,
    },
    data() {
      return {
        amount: this.value.amount,
        active: this.value.active,
        loading: false,
        deleted: false,
        error: false,
        errMsg: '',
      };
    },
    methods: {
      editItem(cartItem) {
        this.loading = true;
        cart_service.editItemInMyCart(cartItem, (msg) => {
          if (msg.status === 'SUCCESS') {
            this.error = false;
            this.amount = cartItem.amount;
            this.active = cartItem.active;
            this.$emit('change', cartItem);
          } else if (msg.status === 'ITEM_NOT_FOUND') {
            this.error = true;
            this.errMsg = 'Edit item - Item not found';
            this.deleted = true;
            this.$emit('remove');
          } else if (msg.status === 'MIN_AMOUNT_EXCEEDED') {
            this.error = true;
            this.errMsg = 'Edit item - Min amount exceeded';
          } else if (msg.status === 'MAX_AMOUNT_EXCEEDED') {
            this.error = true;
            this.errMsg = 'Edit item - Max amount exceeded';
          } else if (msg.status === 'UNAUTHORIZED') {
            this.error = true;
            this.errMsg = 'Edit item - Please sign in first';
          } else {
            this.error = true;
            this.errMsg = 'Edit item - Unknown error';
          }
          this.loading = false;
        });
      },
      handleAmountChange(amount) {
        if (this.deleted || this.loading)
          return;
        this.editItem({
          book: this.value.book,
          amount: amount,
          active: this.active,
        });
      },
      handleActiveChange(active) {
        if (this.deleted || this.loading)
          return;
        this.editItem({
          book: this.value.book,
          amount: this.amount,
          active: active,
        });
      },
      handleRemoveItem() {
        if (this.deleted || this.loading)
          return;
        this.loading = true;
        cart_service.deleteItemFromMyCart(this.value.book.id, (msg) => {
          if (msg.status === 'SUCCESS') {
            this.error = false;
            this.deleted = true;
            this.$emit('delete', this.value);
          } else if (msg.status === 'UNAUTHORIZED') {
            this.error = true;
            this.errMsg = 'Remove item - Please sign in first';
          } else {
            this.error = true;
            this.errMsg = 'Remove item - Unknown error';
          }
          this.loading = false;
        });
      }
    },
  };
</script>

<style scoped>
  .cart-item-card {
    max-width: fit-content;
  }
  .cart-item-card__cover {
    min-width: 160px;
    max-width: 160px;
  }
  .cart-item-card__book-info {
    overflow: hidden;
  }
  .cart-item-card__book-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .cart-item-card__book-basic {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #777777;
  }
  .cart-item-card__right {
    min-width: 400px;
    max-width: 400px;
    min-height: 100%;
  }
  .cart-item-card__price {
    max-width: fit-content;
  }
  .cart-item-card__remove-item {
    color: #777777;
    font-size: 15px;
    cursor: pointer;
  }
</style>
