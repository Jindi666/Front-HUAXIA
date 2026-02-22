<template>
  <!-- <div id="chart" ref="chart" class="chart-pie"></div> -->
  <div class="chart-container2">
    <div id="chart" ref="chart" :style="{ visibility: chartVisible }" class="chart-pie"></div>
    <div class="empty-mask" :style="{ visibility: maskVisible }">
      <h2 class="title1">{{ $t('dashboard.digitalEmployeeDatav.text') }}</h2>
      <div class="empty-container">
        <a-empty :description="$t('public.noData.text')" image="@/assets/datav/default-chart2.png" />
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import line from 'echarts/lib/chart/line'
import { addListener, removeListener } from 'resize-detector'
import dashboardApi from '@/api/dashboard'
import dashboardApiDemo from '../mockApi/dashboardApi.js'
import { chartColors } from '../components/chartColors'
import queryId from '@/store/queryId.js'

export default {
  name: 'WorkerUsage',
  props: {
    refreshInterval: {
      type: Number,
      default: function() {
        return 30000
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
      intervalObj: null,
      firstLoad: true,
      chartVisible: 'hidden',
      maskVisible: 'visible'
    }
  },
  mounted() {
    this.initChart()
    addListener(this.$refs.chart, this.resizeChart)
    this.loadData(1)

    const that = this
    this.intervalObj = window.setInterval(function() {
      that.loadData(1)
    }, this.refreshInterval)
  },
  beforeDestroy() {
    removeListener(this.$refs.chart, this.resizeChart)
    window.clearInterval(this.intervalObj)
  },
  methods: {
    getOption() {
      let option = {
        background: 'rgba(6,30,93,0.5)',
        color: chartColors,
        title: {
          top: '10',
          left: '0',
          text: this.$t('dashboard.digitalEmployeeDatav.text'),
          textStyle: {
            color: '#8AABFB'
          }
        },
        tooltip: {
          trigger: 'item',
          textStyle: {
            fontSize: 20
          },
          formatter: function(params) {
            return params.seriesName + '<br/>' + params.name + '：' + params.data + '%'
          }
        },
        legend: {
          top: '10',
          right: '0',
          left: '200px',
          data: [],
          textStyle: {
            color: '#8AABFB'
          }
        },
        grid: {
          left: '10',
          right: '10',
          top: '80px',
          bottom: '12px',
          height: '180px',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisLabel: {
              // rotate: 30
              color: '#8AABFB'
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#000'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: this.$t('datav.usageRate.text'),
            nameTextStyle: {
              color: '#8AABFB',
              padding: [0, 0, 0, -60]
            },
            min: 0,
            max: 100,
            interval: 20,
            axisLabel: {
              formatter: '{value} %',
              color: '#8AABFB'
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#4D5459'
              }
            }
          }
        ],
        series: [
          {
            name: '聚类分析',
            type: 'line',
            symbolSize: 12,
            iconStyle: {
              color: chartColors[0]
            },
            data: [],
            color: chartColors[0]
          }
        ]
      }
      let width = document.body.clientWidth
      if (width > 3000) {
        option.tooltip.textStyle.fontSize = 40
        option.title.top = '20'
        option.title.textStyle.fontSize = '36'
        option.grid.left = '10'
        option.grid.right = '20'
        option.grid.top = '130px'
        option.grid.bottom = '20px'
        option.grid.height = '380px'
        option.xAxis[0].axisLabel.fontSize = '20px'
        // option.xAxis[0].top = '20px'
        option.legend.textStyle.fontSize = '28'
        option.legend.top = '20px'
        option.legend.left = '400px'
        option.yAxis[0].axisLabel.fontSize = '24'
        option.yAxis[0].nameTextStyle.fontSize = '28'
        option.series[0].barWidth = '20'
        // option.series[1].barWidth = '20px'
      }
      return option
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
    getServe(name, index) {
      return {
        name: name,
        type: 'line',
        symbolSize: 16,
        iconStyle: {
          color: chartColors[index]
        },
        data: [],
        color: chartColors[index]
      }
    },
    loadData(type) {
      if (this.firstLoad) {
        this.chart.showLoading()
      }
      let that = this
      this.getApi()
        .queries(queryId.QUERYSCREENLINECHART_USERATE)
        .then(response => {
          if (response?.data?.query_result?.data) {
            const option = this.getOption()
            const items = response?.data?.query_result?.data.rows
            let utilTypes = [],
              index = 0,
              legenedNames = []
            // option.series[0].data = []
            for (let item of items) {
              let serve
              if (utilTypes.indexOf(item['toolName']) < 0) {
                utilTypes.push(item['toolName'])
                legenedNames.push({
                  name: item['toolName'],
                  icon: 'path://M1170.285714 0h658.285715v658.285714h-658.285715z'
                })
                serve = that.getServe(item['toolName'], index)
                if (option.series[0].name != item['toolName']) {
                  option.series.push(serve)
                }
              }
              index = utilTypes.indexOf(item['toolName'])
              option.series[index].data.push(item['useRate'] * 100)
              if (option.xAxis[0].data.indexOf(item['queryDate']) < 0) {
                option.xAxis[0].data.push(item['queryDate'])
              }
            }

            option.legend.data = legenedNames
            this.chartVisible = 'visible'
            this.maskVisible = 'hidden'
            this.chart.setOption(option)
            if (this.firstLoad) {
              this.chart.hideLoading()
              this.firstLoad = false
            }
          } else {
            this.$message.error(response.message)
            this.chartVisible = 'hidden'
            this.maskVisible = 'visible'
          }
        })
        .catch(err => {
          this.chart.hideLoading()
        })
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .ant-empty-image {
  @media screen and (min-width: 3000px) {
    height: 200px;
  }
}
.chart-container2 {
  position: relative;
  height: 280px;
  // border-top: 1px solid #546fb0;
  @media screen and (min-width: 3000px) {
    height: 540px;
  }
}
// .chart-pie {
//   width: 100%;
// }
.empty-mask {
  // text-align: center;
  // padding-top: 70px;
  position: absolute;
  width: 100%;
  top: 0px;
  left: 0px;
  top: 0px;
  bottom: 0px;
  color: white;

  .empty-container {
    padding-top: 70px;
    // @media screen and (min-width: 3000px) {
    //   padding-top: 140px;
    // }
    @media screen and (min-width: 3000px) {
      padding-top: 140px;
    }
  }

  h2.title1 {
    color: #8aaafc;
    font-size: 18px;
    font-weight: bold;
    position: absolute;
    left: 9px;
    top: 11px;
    text-align: left;
    width: 100%;
    @media screen and (min-width: 3000px) {
      font-size: 36px;
      left: 18px;
      top: 22px;
    }
  }
}

// .chart-pie {
//   position: absolute;
//   width: 100%;
//   height: 260px;
//   @media screen and (min-width: 3000px) {
//     height: 520px;
//   }
// }
.chart-pie {
  position: absolute;
  width: 100%;
  height: 280px;
  padding: 0px 10px;
  @media screen and (min-width: 3000px) {
    height: 560px;
    padding: 0px 20px;
  }
}
.option-box {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  text-align: right;

  strong {
    font-size: 16px;
    font-weight: 600;
    margin-left: 1em;
    @media screen and (min-width: 3000px) {
      font-size: 32px;
    }
  }
}

.chart-container2 /deep/ .ant-empty-description {
  color: rgba(132, 172, 255, 1);
  font-size: 24px;
  @media screen and (min-width: 3000px) {
    margin-top: 20px;
    font-size: 48px;
  }
}
</style>
