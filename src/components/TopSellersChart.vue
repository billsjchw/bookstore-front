<template>
  <div class="top-sellers-chart d-flex flex-column align-items-center">
    <div v-if="loading"><b-spinner/></div>
    <div v-else-if="error">Failed to load the top sellers</div>
    <chart v-else :options="chartOptions"/>
    <time-placed-range-select :value="timePlacedRange" @change="handleSwitchTimePlacedRange"
                              class="top-sellers-chart__time-placed-range-select"/>
  </div>
</template>

<script>
  import {Chart} from 'highcharts-vue';
  import TimePlacedRangeSelect from '@/components/TimePlacedRangeSelect';
  import stat_service from '@/services/stat_service';
  import util from '@/utils/util';

  export default {
    name: 'TopSellersChart',
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
        let bookTitles = this.topSellers.map((e) => e.book.title);
        let totalAmounts = this.topSellers.map((e) => e.totalAmount);
        return {
          chart: {
            type: 'column',
          },
          title: {
            text: 'Top Sellers',
          },
          xAxis: {
            categories: bookTitles,
              title: {
              text: null,
            },
          },
          yAxis: {
            min: 0,
              title: {
              text: 'Total Amount',
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
              name: 'Total Amount',
              showInLegend: false,
              data: totalAmounts,
            },
          ],
        };
      },
    },
    created() {
      this.fetchTopSellers();
    },
    methods: {
      fetchTopSellers() {
        this.loading = true;
        let timePlacedStartEnd = util.calcTimeStartEnd(this.timePlacedRange);
        let timePlacedStart = timePlacedStartEnd.timeStart;
        let timePlacedEnd = timePlacedStartEnd.timeEnd;
        stat_service.findTopSellers(this.n, timePlacedStart, timePlacedEnd, (msg) => {
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
        this.fetchTopSellers();
      },
    },
  };
</script>

<style scoped>
  .top-sellers-chart {
    min-width: 600px;
    max-width: 600px;
  }
  .top-sellers-chart__time-placed-range-select {
    min-width: 200px;
    max-width: 200px;
  }
</style>