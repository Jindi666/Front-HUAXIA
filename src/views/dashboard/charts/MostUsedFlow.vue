<template>
  <div class="chart-container2">
    <div id="chart" ref="chart" :style="{ visibility: chartVisible }" class="chart-pie"></div>
    <div class="empty-mask" :style="{ visibility: maskVisible }">
      <a-empty :description="$t('public.noData.text')" image="/img/bar.png" />
    </div>
    <div class="option-box">
      <a-select :defaultValue="1" class="laiye-select-dark" size="small" @change="handleChange">
        <a-icon slot="suffixIcon" type="caret-down" />
        <a-select-option :value="1">{{ $t('dashboard.latestOneWeek.text') }}</a-select-option>
        <a-select-option :value="2">{{ $t('dashboard.latestTwoWeek.text') }}</a-select-option>
        <a-select-option :value="3">{{ $t('dashboard.latestOneMonth.text') }}</a-select-option>
      </a-select>
      <strong>{{ $t('dashboard.mostUsedTop10.text') }}</strong>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import bar from 'echarts/lib/chart/bar'
import dashboardApi from '@/api/dashboard'
import dashboard from '@/api/dashboard'

import { addListener, removeListener } from 'resize-detector'
import { dashColors } from '../DashColors'

export default {
  name: 'MostUsedFlow',
  data() {
    return {
      chart: null,
      chartVisible: 'hidden',
      maskVisible: 'visible',
      resArr: [],
    }
  },
  mounted() {
    this.initChart()
    this.loadData(1)
    addListener(this.$refs.chart, this.resizeChart)
  },
  beforeDestroy() {
    removeListener(this.$refs.chart, this.resizeChart)
  },
  methods: {
    getOption() {
      const vm = this
      return {
        color: dashColors,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none',
            crossStyle: {
              color: '#999',
            },
          },
          formatter(params) {
            let temp = params[0].name
            if (temp.length > 8) {
              temp = temp.substring(0, 8)
              vm.resArr.forEach((item) => {
                if (item.flowName.includes(temp)) {
                  temp = item.flowName
                  return
                }
              })
            }
            let res = temp
            for (const it of params) {
              res += `<div>${it.seriesName}: ${it.value}`
              if (it.seriesName === vm.$t('dashboard.runCount.text')) {
                res += vm.$tc('public.time.text', it.value > 1 ? 2 : 1) + '</div>'
              } else {
                res += vm.$tc('public.minute.text', it.value > 1 ? 2 : 1) + '</div>'
              }
            }
            return res
          },
        },
        legend: {
          bottom: 'bottom',
          data: [this.$t('dashboard.runCount.text'), this.$t('dashboard.saveMinite.text')],
        },
        grid: {
          left: '12px',
          right: '12px',
          bottom: '36px',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisLabel: {
              rotate: 30,
            },
            axisPointer: {
              type: 'shadow',
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: this.$t('dashboard.runCount1.text'),
            min: 0,
            nameTextStyle: {
              padding: [0, 0, 0, 32],
            },
            axisLabel: {
              formatter: '{value}',
            },
          },
          {
            type: 'value',
            name: this.$t('dashboard.saveMinite1.text'),
            min: 0,
            axisLabel: {
              formatter: '{value}',
            },
          },
        ],
        series: [
          {
            name: this.$t('dashboard.runCount.text'),
            type: 'bar',
            data: [],
            barWidth: '10px',
            color: ['#202B4F'],
          },
          {
            name: this.$t('dashboard.saveMinite.text'),
            type: 'line',
            yAxisIndex: 1,
            data: [],
            barWidth: '10px',
            color: ['#1890FF'],
          },
        ],
      }
    },
    handleChange(val) {
      this.loadData(val)
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
    loadData(type) {
      this.chart.showLoading()
      dashboardApi.queryMostUsedFlow(type).then((response) => {
        const data = response.data
        this.resArr = []
        if (data.length > 0) {
          // this.selectRankCount(data,10)
          this.resArr = data
          const option = this.getOption()
          for (let item of data) {
            let flowName = '-'
            if (item['flowName']) {
              if (item['flowName'].length > 8) {
                flowName = item['flowName'].substring(0, 8) + '...'
              } else {
                flowName = item['flowName']
              }
            }
            option.xAxis[0].data.push(flowName)
            option.series[0].data.push(item['executeCount'])
            option.series[1].data.push(item['workHours'])
          }
          this.chart.hideLoading()
          this.chart.setOption(option)
          this.chartVisible = 'visible'
          this.maskVisible = 'hidden'
        } else {
          this.chartVisible = 'hidden'
          this.maskVisible = 'visible'
        }
      })
    },

    selectRankCount(arr, count) {
      if (arr && arr.length > count) {
        var result = arr.concat()
        result.sort((item1, item2) => {
          if (item1.executeCount != item2.executeCount) {
            return item2.executeCount - item1.executeCount
          }
          return item1.flowName.localeCompare(item2.flowName)
        })

        result = result.slice(0, count)

        for (var i = 0; i < arr.length; i++) {
          if (result.indexOf(arr[i]) != -1) {
            continue
          } else {
            arr.splice(i, 1)
            i--
          }
        }
      }
    },
  },
}
</script>

<style scoped lang="less">
.chart-container2 {
  height: 400px;
  position: relative;
}
.empty-mask {
  text-align: center;
  padding-top: 136px;
  position: absolute;
  width: 100%;
  top: 0px;
  left: 0px;
  top: 0px;
  bottom: 0px;
  background: white;
}
.chart-pie {
  position: absolute;
  width: 100%;
  top: 0px;
  left: 0px;
  top: 0px;
  bottom: 0px;
}
.option-box {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  text-align: right;

  strong {
    font-size: 16px;
    font-weight: 400;
    margin-left: 1em;
    color: #425b6d;
  }
}
.chart-container2 /deep/ .ant-empty-image {
  img {
    width: 126px;
    height: 126px;
  }
}
.chart-container2 /deep/ .ant-empty-description {
  color: #999;
  margin-top: 31px;
}
</style>
