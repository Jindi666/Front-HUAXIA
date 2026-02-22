<template>
  <div class="chart-container2">
    <div id="chart" ref="chart" :style="{ visibility: chartVisible }" class="chart-pie"></div>
    <div class="empty-mask" :style="{ visibility: maskVisible }">
      <a-empty :description="$t('public.noData.text')" image="/img/pie.png" />
    </div>
    <div class="option-box">
      <a-select :defaultValue="1" class="laiye-select-dark" size="small" @change="handleChange">
        <a-icon slot="suffixIcon" type="caret-down" />
        <a-select-option :value="1">{{ $t('dashboard.latestOneWeek.text') }}</a-select-option>
        <a-select-option :value="2">{{ $t('dashboard.latestTwoWeek.text') }}</a-select-option>
        <a-select-option :value="3">{{ $t('dashboard.latestOneMonth.text') }}</a-select-option>
      </a-select>
      <strong>{{ $t('dashboard.taskFailReasonDistribution.text') }}</strong>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import pie from 'echarts/lib/chart/pie'
import { addListener, removeListener } from 'resize-detector'
import dashboardApi from '@/api/dashboard'
import { conicalColumnChart } from '@jiaminghi/data-view'
import { dashColors } from '../DashColors'

export default {
  name: 'FailReasonPie',
  data() {
    return {
      chart: null,
      chartVisible: 'hidden',
      maskVisible: 'visible',
      cycle: 1
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
      var times = this.$t("dashboard.times.text")
      return {
        color: dashColors,
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}' + times + '({d}%)'
        },
        legend: {
          orient: 'horizontal',
          bottom: 'bottom',
          data: []
        },
        series: [
          {
            name: this.$t('dashboard.failReason.text'),
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [],
            label: {
              show: true,
              formatter: '{c}'
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    },
    handleChange(val) {
      this.cycle = val
      this.loadData(val)
    },
    resizeChart() {
      if (this.chart) {
        this.chart.resize()
      }
    },
    initChart() {
      this.chart = echarts.init(this.$refs.chart)
      this.chart.setOption(this.getOption())
      this.chart.on('click', params => {
        //根据cycle类型查询时间段内任务运行失败错误信息为params.name的数据
        // cycle 1  7 2 14  3 30
        console.log(params.data)
        this.$router.push({
          path: '/task/taskManagementDetail',
          query: { failReason: params.data.key, cycle: this.cycle }
        })
      })
    },
    loadData(type) {
      this.chart.showLoading()
      dashboardApi.queryFailReason(type).then(response => {
        const data = response.data
        if (data && data.length > 0) {
          const option = this.getOption()
          for (const item of data) {
            option.legend.data.push(item['name'])
            option.series[0].data.push(item)
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
  padding-top: 88px;
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
