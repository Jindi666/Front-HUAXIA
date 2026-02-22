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
      <strong>{{ $t('dashboard.taskSuccessRateOne.text') }}</strong>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import bar from 'echarts/lib/chart/bar'
import dashboardApi from '@/api/dashboard'
import { addListener, removeListener } from 'resize-detector'
import dashboard from '@/api/dashboard'
import { dashColors } from '../DashColors'

export default {
  name: 'SucceedRate',
  data() {
    return {
      chart: null,
      chartVisible: 'hidden',
      maskVisible: 'visible',
      that: this
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
      let vm = this
      return {
        color: dashColors,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none',
            crossStyle: {
              color: '#999'
            }
          },
          // formatter: '{b}<br />{a0}:{c0}<br />{a1}:{c1}<br />{a2}:{c2}%<br />{a3}:{c3}%<br />'
          formatter(params) {
            let res = params[0].name
            for (const it of params) {
              if (it.seriesName === vm.$t('dashboard.successRate.text') || it.seriesName === vm.$t('dashboard.failRate.text')) {
                res += `<div>${it.seriesName}: ${it.value}%</div>`
              } else {
                res += `<div>${it.seriesName}: ${it.value}` + vm.$tc('public.one1.text', it.value > 1 ? 2 : 1) + '</div>'
              }
            }
            return res
          }
        },
        legend: {
          data: [this.$t('dashboard.runSuccess.text'), this.$t('dashboard.runFail.text'), this.$t('dashboard.successRate.text'), this.$t('dashboard.failRate.text')],
          bottom: 'bottom'
        },
        grid: {
          left: '12px',
          right: '12px',
          bottom: '36px',
          top: '66px',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: this.$t('dashboard.taskCount.text'),
            min: 0,
            axisLabel: {
              formatter: '{value}'
            },
            nameTextStyle: {
              padding: [0, 0, 0, 24]
            },
            splitLine: {
              show: false
            }
          },
          {
            type: 'value',
            name: this.$t('dashboard.successRatePer.text'),
            min: 0,
            max: 100,
            interval: 20,
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: this.$t('dashboard.runSuccess.text'),
            type: 'bar',
            data: [],
            barWidth: '10px',
            color: ['#1890FF']
          },
          {
            name: this.$t('dashboard.runFail.text'),
            type: 'bar',
            data: [],
            barWidth: '10px',
            color: ['#202B4F']
          },
          {
            name: this.$t('dashboard.successRate.text'),
            type: 'line',
            yAxisIndex: 1,
            data: [],
            barWidth: '10px',
            color: ['#1890FF']
          },
          {
            name: this.$t('dashboard.failRate.text'),
            type: 'line',
            yAxisIndex: 1,
            data: [],
            barWidth: '10px',
            color: ['#202B4F']
          }
        ]
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
      dashboardApi.querySuccessRate(type).then(response => {
        const data = response.data
        // data.reverse()
        const option = this.getOption()
        let maxCount = 0
        if (data && data.length > 0) {
          for (const item of data) {
            if (item['unattendedTask'] > maxCount) {
              maxCount = item['unattendedTask']
            }

            if (item['someonTask'] > maxCount) {
              maxCount = item['someonTask']
            }
            /*
            { "date": "01.18","taskSucceed": 0,"succeedRate": 0,"taskFailed": 1,"failedRate": 33.33}
            */
            option.xAxis[0].data.push(item['date'])
            option.series[0].data.push(item['taskSucceed'])
            option.series[1].data.push(item['taskFailed'])
            option.series[2].data.push(item['succeedRate'])
            option.series[3].data.push(item['failedRate'])
          }
          // option.yAxis[0].interval = Math.round(maxCount / 5) + 1
          this.chart.hideLoading()
          this.chart.setOption(option)
          this.chartVisible = 'visible'
          this.maskVisible = 'hidden'
        } else {
          this.chartVisible = 'hidden'
          this.maskVisible = 'visible'
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.chart-container2 {
  height: 300px;
  position: relative;
}
.empty-mask {
  text-align: center;
  padding-top: 68px;
  position: absolute;
  width: 100%;
  top: 0px;
  left: 0px;
  top: 0px;
  bottom: 0px;
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
