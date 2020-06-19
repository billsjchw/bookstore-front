<template>
  <b-modal title="Disable/Enable User" ref="modal" class="delete-book-modal">
    <div v-if="user">
      <p>Are you sure to {{ user.enabled ? 'disable' : 'enable' }} the user?</p>
      <hr/>
      <p>
        <strong>User ID</strong>: {{ user.id }}<br/>
        <strong>Username</strong>: {{ user.username }}
      </p>
    </div>
    <template v-slot:modal-footer>
      <span v-if="loading"><b-spinner/></span>
      <span v-else-if="error">{{ errMsg }}</span>
      <b-button @click="handleCancel" :disabled="loading" variant="secondary">Cancel</b-button>
      <b-button @click="handleDelete" :disabled="loading" variant="primary">Yes</b-button>
    </template>
  </b-modal>
</template>

<script>
  import user_service from '@/services/user_service';

  export default {
    name: 'SetUserEnabledModal',
    props: {
      user: Object,
    },
    data() {
      return {
        loading: false,
        error: false,
        errMsg: '',
      };
    },
    methods: {
      show() {
        this.loading = false;
        this.error = false;
        this.errMsg = '';
        this.$refs['modal'].show();
      },
      hide() {
        this.$refs['modal'].hide();
      },
      handleCancel() {
        this.hide();
      },
      handleDelete() {
        if (this.loading)
          return;
        this.loading = true;
        user_service.setUserEnabled(this.user.id, !this.user.enabled, (msg) => {
          if (msg.status === 'SUCCESS') {
            this.error = false;
            this.$emit('success', this.user);
            this.hide();
          } else if (msg.status === 'UNAUTHORIZED') {
            this.error = true;
            this.errMsg = 'Please sign in first';
          } else if (msg.status === 'REJECTED') {
            this.error = true;
            this.errMsg = 'Permission denied';
          } else if (msg.status === 'USER_NOT_FOUND') {
            this.error = true;
            this.errMsg = 'User not found';
          } else {
            this.error = true;
            this.errMsg = 'Unknown error';
          }
          this.loading = false;
        });
      },
    },
  };
</script>

<style scoped>
</style>
