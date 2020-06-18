<template>
  <b-navbar type="light" variant="light" class="nav-bar">
    <b-navbar-brand>Bookstore</b-navbar-brand>
    <b-navbar-nav>
      <b-nav-item href="/home" active>📚Home</b-nav-item>
      <b-nav-item href="/cart" active>🛒Cart</b-nav-item>
      <b-nav-item href="/orders" active>📋Orders</b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown right>
        <template v-slot:button-content>
          <b-avatar :src="user.avatar.data" variant="light" class="nav-bar__avatar"/>
        </template>
        <b-dropdown-item href="/profile">Profile</b-dropdown-item>
        <b-dropdown-item @click="handleLogout">Sign out</b-dropdown-item>
        <b-dropdown-item v-if="bookAdmin" href="/book-admin">Book Admin</b-dropdown-item>
        <b-dropdown-item v-if="userAdmin" href="/user-admin">User Admin</b-dropdown-item>
        <b-dropdown-item v-if="orderAdmin" href="/order-admin">Order Admin</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
  import util from '@/utils/util';
  import constant from '@/utils/constant';
  import logout_service from '@/services/logout_service';
  
  export default {
    name: 'NavBar',
    data() {
      return {
        user: util.getUser(),
      };
    },
    computed: {
      bookAdmin() {
        return util.checkAuthority(this.user,
            constant.AuthorityId.BOOK_ADMIN);
      },
      userAdmin() {
        return util.checkAuthority(this.user,
            constant.AuthorityId.USER_ADMIN);
      },
      orderAdmin() {
        return util.checkAuthority(this.user,
          constant.AuthorityId.ORDER_ADMIN);
      },
    },
    methods: {
      handleLogout() {
        logout_service.logout(() => {
          sessionStorage.removeItem('basic');
          sessionStorage.removeItem('user');
          this.$router.push('/login');
        });
      },
    }
  };
</script>

<style scoped>
  .nav-bar__avatar {
    min-width: 32px;
    max-width: 32px;
    min-height: 32px;
    max-height: 32px;
  }
</style>