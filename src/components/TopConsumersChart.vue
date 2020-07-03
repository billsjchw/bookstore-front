<template>
  <div class="top-consumers-chart d-flex flex-column align-items-center">
    <div v-if="loading"><b-spinner/></div>
    <div v-else-if="error">Failed to load the top sellers</div>
    <chart v-else :options="chartOptions"/>
    <time-placed-range-select :value="timePlacedRange" @change="handleSwitchTimePlacedRange"
                              class="top-consumers-chart__time-placed-range-select"/>
  </div>
</template>

<script>
  import {Chart} from 'highcharts-vue';
  import TimePlacedRangeSelect from '@/components/TimePlacedRangeSelect';
  import stat_service from '@/services/stat_service';
  import util from '@/utils/util';

  export default {
    name: 'TopConsumersChart',
    components: {
      'chart': Chart,
      'time-placed-range-select': TimePlacedRangeSelect,
    },
    data() {
      return {
        loading: false,
        error: false,
        timePlacedRange: '7_DAYS',
        n: 6,
        topSellers: [],
      };
    },
    computed: {
      chartOptions() {
        let usernames = this.topSellers.map((e) => e.user.username);
        let totalPrices = this.topSellers.map((e) => e.totalPrice / 100);
        return {
          chart: {
            type: 'column',
          },
          title: {
            text: 'Top Consumers',
          },
          xAxis: {
            categories: usernames,
            title: {
              text: null,
            },
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Total Price (Yuan)',
            },
            labels: {
              overflow: 'justify',
            },
          },
          plotOptions: {
            bar: {
              dataLabels: {
                enabled: true,
              },
            },
          },
          credits: {
            enabled: false,
          },
          series: [
            {
              name: 'Total Price (Yuan)',
              showInLegend: false,
              data: totalPrices,
            },
          ],
        };
      },
    },
    created() {
      this.fetchTopConsumers();
    },
    methods: {
      fetchTopConsumers() {
        this.loading = true;
        let timePlacedStartEnd = util.calcTimeStartEnd(this.timePlacedRange);
        let timePlacedStart = timePlacedStartEnd.timeStart;
        let timePlacedEnd = timePlacedStartEnd.timeEnd;
        stat_service.findTopConsumers(this.n, timePlacedStart, timePlacedEnd, (msg) => {
          if (msg.status === 'SUCCESS') {
            this.error = false;
            this.topSellers = msg.data;
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
        this.fetchTopConsumers();
      },
    },
  };
</script>

<style scoped>
  .top-consumers-chart {
    min-width: 600px;
    max-width: 600px;
  }
  .top-consumers-chart__time-placed-range-select {
    min-width: 200px;
    max-width: 200px;
  }
</style>
