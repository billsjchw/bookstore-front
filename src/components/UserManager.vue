<template>
  <div class="user-manager d-flex flex-column align-items-center">
    <div class="w-100 d-flex justify-content-between">
      <div class="user-manager__dummy-block mr-2"/>
      <search-bar @search="handleSearch" class="user-manager__search-bar"/>
      <b-button @click="handleRefresh" block variant="secondary" class="user-manager__refresh">
        <b-icon icon="arrow-repeat"/>
      </b-button>
    </div>
    <div v-if="loading"><b-spinner/></div>
    <div v-else>
      <user-table :users="users" class="mt-3" @set-user-enabled="handleSetUserEnabled"/>
    </div>
    <b-pagination v-model="page" :total-rows="totalUsers"
                  :per-page="pageSize" @change="handleSwitchPage"/>
    <set-user-enabled-modal :user="setUserEnabledModal.user" @success="handleSetUserEnabledSuccess"
                       ref="set-user-enabled-modal"/>
  </div>
</template>

<script>
  import user_service from '@/services/user_service';
  import SearchBar from '@/components/SearchBar';
  import UserTable from '@/components/UserTable';
  import SetUserEnabledModal from '@/components/SetUserEnabledModal';

  export default {
    name: 'UserManager',
    components: {
      'search-bar': SearchBar,
      'user-table': UserTable,
      'set-user-enabled-modal': SetUserEnabledModal,
    },
    props: {
      pageSize: Number,
    },
    data() {
      return {
        page: 1,
        keyword: '',
        users: [],
        totalUsers: 0,
        loading: false,
        setUserEnabledModal: {
          user: null,
        },
      };
    },
    created() {
      this.fetchUsers('', 0);
    },
    methods: {
      fetchUsers(keyword, page) {
        this.loading = true;
        let callback = (msg) => {
          console.log(msg);
          if (msg.status === 'SUCCESS') {
            this.keyword = keyword;
            this.page = page + 1;
            this.users = msg.data.content;
            this.totalUsers = msg.data.totalElements;
          }
          this.loading = false;
        };
        if (keyword)
          user_service.userFuzzySearch(keyword, page, this.pageSize, callback);
        else
          user_service.findAllUsers(page, this.pageSize, callback);
      },
      handleSearch(keyword) {
        if (this.loading)
          return;
        this.fetchUsers(keyword, 0);
      },
      handleSwitchPage(page) {
        if (this.loading)
          return;
        this.fetchUsers(this.keyword, page - 1);
      },
      handleRefresh() {
        if (this.loading)
          return;
        this.fetchUsers(this.keyword, this.page - 1);
      },
      handleSetUserEnabled(user) {
        this.setUserEnabledModal.user = user;
        this.$refs['set-user-enabled-modal'].show();
      },
      handleSetUserEnabledSuccess() {
        if (this.loading)
          return;
        this.fetchUsers(this.keyword, this.page - 1);
      },
    },
  };
</script>

<style scoped>
  .user-manager__search-bar {
    min-width: 400px;
    max-width: 400px;
  }
  .user-manager__refresh {
    min-width: 46px;
    max-width: 46px;
  }
  .user-manager__dummy-block {
    min-width: 46px;
    max-width: 46px;
  }
</style>
