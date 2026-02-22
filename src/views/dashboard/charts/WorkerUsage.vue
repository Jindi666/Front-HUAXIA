<template>
  <div class="chart-container2">
    <div id="chart" ref="chart" :style="{ visibility: chartVisible }" class="chart-pie"></div>
    <div class="empty-mask" :style="{ visibility: maskVisible }">
      <a-empty :description="$t('public.noData.text')" image="/img/bar.png" />
    </div>
    <div class="option-box">
      <a-select :defaultValue="1" class="laiye-select-dark select" size="small" @change="handleChange">
        <a-icon slot="suffixIcon" type="caret-down" />
        <a-select-option :value="1">{{ $t('dashboard.latestOneWeek.text') }}</a-select-option>
        <a-select-option :value="2">{{ $t('dashboard.latestTwoWeek.text') }}</a-select-option>
        <a-select-option :value="3">{{ $t('dashboard.latestOneMonth.text') }}</a-select-option>
      </a-select>
      <strong>{{ $t('dashboard.workUsage.text') }}</strong>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import line from 'echarts/lib/chart/line'
import dashboardApi from '@/api/dashboard'
import { addListener, removeListener } from 'resize-detector'
import { dashColors } from '../DashColors'

export default {
  name: 'WorkerUsage',
  data() {
    return {
      chart: null,
      chartVisible: 'hidden',
      maskVisible: 'visible'
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
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none',
            crossStyle: {
              color: '#999'
            }
          },
          // 使用占位符或者函数的方式
          // formatter: '{b}<br />{a0}: {c0}%<br />{a1}: {c1}%<br />'
          formatter(params) {
            let res = params[0].name
            for (const el of params) {
              res += `<div>${el.seriesName}: ${el.value}%</div>`
            }
            return res
          }
        },
        legend: {
          bottom: 'bottom',
          data: [this.$t('dashboard.workerAttend.text'), this.$t('dashboard.workerUnattend.text')]
        },
        grid: {
          left: '12px',
          right: '12px',
          bottom: '36px',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisLabel: {
              rotate: 30
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: this.$t('dashboard.usage.text'),
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
            name: this.$t('dashboard.workerAttend.text'),
            type: 'line',
            data: [],
            color: ['#1890FF']
          },
          {
            name: this.$t('dashboard.workerUnattend.text'),
            type: 'line',
            data: [],
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
      dashboardApi.queryWorkerUsage(type).then(response => {
        if (response.code == 0) {
          this.chart.hideLoading()

          const option = this.getOption()
          const items = response.data
          if (items && items.length > 0) {
            // items.reverse()
            for (let item of items) {
              option.xAxis[0].data.push(item['date'])
              option.series[0].data.push(item['attendedRate'])
              option.series[1].data.push(item['unattendedRate'])
            }
            this.chart.setOption(option)
            this.chartVisible = 'visible'
            this.maskVisible = 'hidden'
          } else {
            this.chartVisible = 'hidden'
            this.maskVisible = 'visible'
          }
        } else {
          this.$message.error(response.message)
        }
      })
    }
  }
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
