<template>
  <b-form-select :options="timePlacedRangeOptions" :value="value"
                 @change="handleChange" class="time-placed-range-select"/>
</template>

<script>
  export default {
    name: 'TimePlacedRangeSelect',
    props: {
      value: String,
    },
    data() {
      return {
        timePlacedRangeOptions: [
          { value: '7_DAYS', text: 'Last 7 days' },
          { value: '4_WEEKS', text: 'Last 4 weeks' },
          { value: '3_MONTHS', text: 'Last 3 months' },
          { value: '1_YEAR', text: 'Last 1 year' },
          { value: 'ALL', text: 'All time' },
        ],
      };
    },
    methods: {
      handleChange(value) {
        this.$emit('change', value);
      },
    },
  };
</script>

<style scoped>
</style>
