<template>
  <div id="chart" ref="chart" class="chart-bar"></div>
</template>

<script>
import echarts from 'echarts'
import bar from 'echarts/lib/chart/bar'
import { addListener, removeListener } from 'resize-detector'
import dashboardApi from '@/api/dashboard'
import dashboard from '@/api/dashboard'
import { dashColors } from '../DashColors'

const colors = ['#202B4F']

export default {
  name: 'RegionBar',
  props: {
    refreshInterval: {
      type: Number,
      default: function() {
        return 30000
      }
    },
    type: {
      type: Number,
      default: function() {
        return 1
      }
    },
    demoMode: {
      type: Boolean,
      default: function() {
        return true
      }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    type: function(val) {
      this.loadData(val)
    }
  },
  mounted() {
    this.initChart()
    addListener(this.$refs.chart, this.resizeChart)
    this.loadData(1)
  },
  beforeDestroy() {
    removeListener(this.$refs.chart, this.resizeChart)
  },
  methods: {
    getOption() {
      return {
        color: dashColors,
        grid: {
          left: '12px',
          right: '62px',
          bottom: '0px',
          top: '0px',
          containLabel: true,
          show: false
        },
        yAxis: [
          {
            type: 'category',
            data: [],
            axisLabel: {
              // rotate: 30
              color: '#000',
              interval: 0
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: 'rgba(0, 0, 0, 0)'
              }
            }
          }
        ],
        xAxis: [
          {
            type: 'value',
            name: this.$t('dashboard.runCount.text'),
            min: 0,
            // interval: 500,
            show: false,
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: this.$t('dashboard.runCount.text'),
            type: 'bar',
            data: [],
            barWidth: '8px',
            label: {
              position: 'right',
              show: true
              // textBorderColor: '#333',
              // textBorderWidth: 2
            },
            itemStyle: {
              barBorderRadius: 10,
              color: function(row) {
                const idx = row.dataIndex
                return colors[idx % colors.length]
              }
            }
          }
        ]
      }
    },
    getApi() {
      return dashboardApi
    },
    initChart() {
      this.chart = echarts.init(this.$refs.chart)
      this.chart.setOption(this.getOption())
    },
    resizeChart() {
      if (this.chart) {
        this.chart.resize()
      }
    },
    loadData() {
      this.getApi()
        .queryTaskRegions(this.type)
        .then(response => {
          if (response.code === 0) {
            let data = response.data
            if (data.length) {
              // 默认只显示前12条数据
              data = data.filter((item, index) => index < 12).sort((item1, item2) => item2.taskCount - item1.taskCount)
            }
            const option = this.getOption()
            for (const item of data) {
              option.yAxis[0].data.push(item['region'])
              option.series[0].data.push(item['taskCount'])
            }
            option.yAxis[0].data = option.yAxis[0].data.reverse()
            option.series[0].data = option.series[0].data.reverse()
            this.chart.setOption(option)
          } else {
            this.$message.error(response.message)
          }
        })
    }
  }
}
</script>

<style scoped lang="less">
.chart-bar {
  width: 100%;
  height: 324px;
}
</style>
