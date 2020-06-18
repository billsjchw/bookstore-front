<template>
  <div class="order-list">
    <div class="d-flex justify-content-between align-items-center">
      <h2 v-if="!admin">Your Orders</h2>
      <h2 v-else>Orders</h2>
      <div class="d-flex">
        <b-form-select :options="timePlacedRangeOptions" v-model="timePlacedRange"
                       @change="handleSwitchTimePlacedRange" class="order-list__placed-time-select"/>
        <search-bar @search="handleSearch" class="order-list__search-bar ml-2"/>
      </div>
    </div>
    <div class="d-flex justify-content-center mt-3">
      <div v-if="loading">
        <b-spinner/>
      </div>
      <div v-else-if="error">
        <p>Failed to load the orders</p>
      </div>
      <div v-else>
        <order-table :orders="orders"/>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <b-pagination v-model="page" @change="handleSwitchPage"
                    :total-rows="totalOrders" :per-page="pageSize"/>
    </div>
  </div>
</template>

<script>
  import SearchBar from '@/components/SearchBar';
  import util from '@/utils/util';
  import order_service from '@/services/order_service';
  import OrderTable from '@/components/OrderTable';

  export default {
    name: 'OrderList',
    props: {
      pageSize: Number,
      admin: Boolean,
    },
    components: {
      'order-table': OrderTable,
      'search-bar': SearchBar,
    },
    data() {
      return {
        loading: false,
        error: false,
        keyword: '',
        page: 1,
        orders: [],
        totalOrders: 0,
        timePlacedRange: '7_DAYS',
        timePlacedRangeOptions: [
          { value: '7_DAYS', text: 'Last 7 days' },
          { value: '4_WEEKS', text: 'Last 4 weeks' },
          { value: '3_MONTHS', text: 'Last 3 months' },
          { value: '1_YEAR', text: 'Last 1 year' },
          { value: 'ALL', text: 'All time' },
        ],
      };
    },
    created() {
      this.fetchOrders('', '7_DAYS', 0);
    },
    methods: {
      fetchOrders(keyword, timePlacedRange, page) {
        this.loading = true;
        let timePlacedStartEnd = util.calcTimeStartEnd(timePlacedRange);
        let timePlacedStart = timePlacedStartEnd.timeStart;
        let timePlacedEnd = timePlacedStartEnd.timeEnd;
        let callback = (msg) => {
          console.log(msg);
          if (msg.status === 'SUCCESS') {
            this.error = false;
            this.page = page + 1;
            this.keyword = keyword;
            this.timePlacedRange = timePlacedRange;
            this.orders = msg.data.content;
            this.totalOrders = msg.data.totalElements;
          } else {
            this.error = true;
          }
          this.loading = false;
        };
        if (!this.admin && !keyword)
          order_service.myOrderSearch(timePlacedStart, timePlacedEnd, page, this.pageSize, callback);
        else if (!this.admin && keyword)
          order_service.myOrderFuzzySearch(keyword, timePlacedStart, timePlacedEnd, page, this.pageSize, callback);
        else if (this.admin && !keyword)
          order_service.orderSearch(timePlacedStart, timePlacedEnd, page, this.pageSize, callback);
        else
          order_service.orderFuzzySearch(keyword, timePlacedStart, timePlacedEnd, page, this.pageSize, callback);
      },
      handleSearch(keyword) {
        if (this.loading)
          return;
        console.log(keyword);
        this.fetchOrders(keyword, this.timePlacedRange, 0);
      },
      handleSwitchTimePlacedRange(timePlacedRange) {
        if (this.loading)
          return;
        this.fetchOrders(this.keyword, timePlacedRange, 0);
      },
      handleSwitchPage(page) {
        if (this.loading)
          return;
        this.fetchOrders(this.keyword, this.timePlacedRange, page - 1);
      },
    },
  };
</script>

<style scoped>
  .order-list {
    min-width: 700px;
  }
  .order-list__placed-time-select {
    min-width: 150px;
    max-width: 150px;
  }
  .order-list__search-bar {
    min-width: 250px;
    max-width: 250px;
  }
</style>
