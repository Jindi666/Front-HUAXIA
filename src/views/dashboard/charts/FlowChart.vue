<template>
  <div>
    <chart :options="options" autoresize />
  </div>
</template>

<script>
import ECharts from 'echarts'
import 'echarts/lib/chart/bar'

import 'echarts/theme/cool'
import { dashColors } from '../DashColors'

export default {
  name: 'FlowChart',
  components: {
    chart: ECharts
  },
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {}
}
</script>

<style scoped lang="less"></style>
