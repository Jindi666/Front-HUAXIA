<template>
  <div id="chart" ref="chart" class="chart-pie"></div>
</template>

<script>
import echarts from 'echarts'
import bar from 'echarts/lib/chart/bar'
import { addListener, removeListener } from 'resize-detector'
import dashboardApi from '@/api/dashboard'
import dashboardApiDemo from '../mockApi/dashboardApi.js'

const colors = ['#36A2DA', '#32C5E9', '#9FE6B8', '#FFDB5D', '#E062AF', '#FA7293', '#E690D1', '#BEF2FF', '#95BFFF', '#4D99FC', '#F66813', '#F6D513', '#2EFBEF']

export default {
  name: 'RegionBar',
  props: {
    refreshInterval: {
      type: Number,
      default: function() {
        return 3000
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
      chart: null,
      intervalRefresh: null
    }
  },
  watch: {
    refreshInterval: function(val) {
      window.clearInterval(this.intervalRefresh)
      const that = this
      this.intervalRefresh = window.setInterval(function() {
        that.loadData()
      }, this.refreshInterval)
    }
  },
  mounted() {
    this.initChart()
    addListener(this.$refs.chart, this.resizeChart)
    this.loadData(1)
  },
  beforeDestroy() {
    removeListener(this.$refs.chart, this.resizeChart)
    window.clearInterval(this.intervalRefresh)
  },
  methods: {
    getOption() {
      return {
        grid: {
          left: '12px',
          right: '62px',
          bottom: '12px',
          top: '12px',
          containLabel: true,
          show: false
        },
        yAxis: [
          {
            type: 'category',
            data: [],
            axisLabel: {
              // rotate: 30
              color: '#fff'
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
            barWidth: '12px',
            label: {
              position: 'right',
              show: true,
              textBorderColor: '#333',
              textBorderWidth: 2
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
      if (this.demoMode) {
        return dashboardApiDemo
      } else {
        return dashboardApi
      }
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
        .queryTaskRegions(1)
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
        .catch(e => {
          this.$message.error(e)
        })
    }
  }
}
</script>

<style scoped lang="less">
.chart-pie {
  width: 100%;
  height: 400px;
}
</style>
