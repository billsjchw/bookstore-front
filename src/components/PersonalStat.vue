<template>
  <div class="personal-stat d-flex flex-column align-items-center">
    <h5 class="mb-3">Personal Statistic</h5>
    <div v-if="loading"><b-spinner/></div>
    <div v-else-if="error">Failed to load the top sellers</div>
    <div v-else-if="personalStat" class="d-flex flex-column align-items-end">
      <item-table :items="personalStat.items"/>
      <h5>Total Amount: {{ personalStat.totalAmount }}</h5>
      <h5>Total Price: &yen;{{ (personalStat.totalPrice / 100).toFixed(2) }}</h5>
    </div>
    <time-placed-range-select :value="timePlacedRange" @change="handleSwitchTimePlacedRange"
                              class="personal-stat__time-placed-range-select"/>
  </div>
</template>

<script>
  import util from '@/utils/util';
  import stat_service from '@/services/stat_service';
  import TimePlacedRangeSelect from '@/components/TimePlacedRangeSelect';
  import ItemTable from '@/components/ItemTable';

  export default {
    name: 'PersonalStat',
    components: {
      'item-table': ItemTable,
      'time-placed-range-select': TimePlacedRangeSelect,
    },
    data() {
      return {
        loading: false,
        error: false,
        timePlacedRange: '7_DAYS',
        personalStat: null,
      };
    },
    created() {
      this.fetchPersonalStat();
    },
    methods: {
      fetchPersonalStat() {
        this.loading = true;
        let timePlacedStartEnd = util.calcTimeStartEnd(this.timePlacedRange);
        let timePlacedStart = timePlacedStartEnd.timeStart;
        let timePlacedEnd = timePlacedStartEnd.timeEnd;
        stat_service.calcMyPersonalStat(timePlacedStart, timePlacedEnd, (msg) => {
          if (msg.status === 'SUCCESS') {
            this.error = false;
            this.personalStat = msg.data;
          } else {
            this.error = true;
          }
          this.loading = false;
        });
      },
      handleSwitchTimePlacedRange(timePlacedRange) {
        if (this.loading)
          return;
        this.timePlacedRange = timePlacedRange;
        this.fetchPersonalStat();
      },
    },
  };
</script>

<style scoped>
  .personal-stat__time-placed-range-select {
    min-width: 200px;
    max-width: 200px;
  }
</style>
