<template>
  <div class="stat-view">
    <nav-bar/>
    <div v-if="stat" class="d-flex flex-column align-items-center mt-3 mb-3">
      <h1>Statistic</h1>
      <top-sellers-chart/>
      <top-consumers-chart class="mt-3"/>
      <personal-stat class="mt-3"/>
    </div>
    <div v-else class="d-flex flex-column align-items-center mt-3 mb-3">
      <h1>Statistic</h1>
      <personal-stat/>
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/NavBar';
  import util from '@/utils/util';
  import constant from '@/utils/constant';
  import TopSellersChart from '@/components/TopSellersChart';
  import TopConsumersChart from '@/components/TopConsumersChart';
  import PersonalStat from '@/components/PersonalStat';

  export default {
    name: 'StatView',
    components: {
      'nav-bar': NavBar,
      'top-sellers-chart': TopSellersChart,
      'top-consumers-chart': TopConsumersChart,
      'personal-stat': PersonalStat,
    },
    computed: {
      stat() {
        return util.checkAuthority(
            util.getUser(), constant.AuthorityId.STAT);
      },
    },
  };
</script>

<style scoped>
  .stat-view {
    min-width: fit-content;
  }
</style>