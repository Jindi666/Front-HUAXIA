<template>
  <div class="chart-container2">
    <div id="chart" ref="chart" :style="{ visibility: chartVisible }" class="chart-pie"></div>
    <div class="empty-mask" :style="{ visibility: maskVisible }">
      <!-- <h2 class="title1">{{ $t('dashboard.mostUsedTopDatav.text') }}</h2> -->
      <div class="empty-container">
        <a-empty :description="$t('public.noData.text')" image="@/assets/datav/default-chart2.png" />
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import bar from 'echarts/lib/chart/bar'
import { addListener, removeListener } from 'resize-detector'
import dashboardApi from '@/api/dashboard'
import dashboardApiDemo from '../mockApi/dashboardApi.js'
import { chartColors, barColors1, barColors2 } from '../components/chartColors'
import queryId from '@/store/queryId.js'
import { BAR_CONSTANT_2K, BAR_CONSTANT_4K } from '../constant'

export default {
  name: 'MostUsedFlow',
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
    this.loadData(3)
    const that = this
    this.intervalObj = window.setInterval(function() {
      that.loadData(3)
    }, this.refreshInterval)
  },
  beforeDestroy() {
    removeListener(this.$refs.chart, this.resizeChart)
    window.clearInterval(this.intervalObj)
  },
  methods: {
    getOption() {
      let option = {
        // color: chartColors,
        color: [
          {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: barColors1[0] }, // 设置颜色渐变
              { offset: 1, color: barColors1[1] }
            ]
          },
          {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: barColors2[0] },
              { offset: 1, color: barColors2[1] }
            ]
          }
        ],
        title: {
          // text: this.$t('dashboard.mostUsedTopDatav.text'),
          left: 0,
          top: 12,
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
            // console.log(params)
            return params.name + '<br/>' + params.seriesName + '：' + (params.seriesIndex == 0 ? params.data : params.data.workHours + '小时')
          }
        },
        legend: {
          selectedMode: false,
          top: 12,
          right: 20,
          data: [
            {
              name: this.$t('dashboard.taskCount.text'),
              icon: 'path://M1170.285714 0h658.285715v658.285714h-658.285715z'
            },
            {
              name: this.$t('dashboard.workHours.text'),
              icon: 'path://M1170.285714 0h658.285715v658.285714h-658.285715z'
            }
          ],
          textStyle: {
            color: '#8AABFB'
          },
          icon: 'square'
        },
        grid: {
          left: '14',
          right: '14',
          bottom: '25',
          top: '65',
          // height: '155px',
          containLabel: true,
          show: false
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisLabel: {
              textStyle: {
                color: '#8AABFB'
              },
              formatter: function(value) {
                return value.length > 6 ? value.slice(0, 6) + '...' : value
              },
              interval: 0
              // formatter: function(value) {
              //   var ret = '' //拼接加\n返回的类目项
              //   var maxLength = 2 //每项显示文字个数
              //   var valLength = value.length //X轴类目项的文字个数
              //   var rowN = Math.ceil(valLength / maxLength) //类目项需要换行的行数
              //   if (rowN > 1) {
              //     //如果类目项的文字大于3,
              //     for (var i = 0; i < rowN; i++) {
              //       var temp = '' //每次截取的字符串
              //       var start = i * maxLength //开始截取的位置
              //       var end = start + maxLength //结束截取的位置
              //       //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
              //       temp = value.substring(start, end) + '\n'
              //       ret += temp //凭借最终的字符串
              //     }
              //     return ret
              //   } else {
              //     return value
              //   }
              // }
            },
            splitLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: this.$t('dashboard.taskCount.text'),
            nameTextStyle: {
              color: '#8AABFB',
              padding: [0, 0, 0, 25]
            },
            min: 0,
            // interval: 500,
            axisLabel: {
              formatter: '{value}',
              color: '#8AABFB'
            },
            splitLine: {
              show: false
            }
          },
          {
            type: 'value',
            name: this.$t('dashboard.workHours.text'),
            nameTextStyle: {
              color: '#8AABFB',
              padding: [0, 75, 0, 0]
            },
            min: 0,
            // max: 30,
            // interval: 6,
            axisLabel: {
              formatter: '{value} ',
              color: '#8AABFB'
            },
            splitLine: {
              lineStyle: {
                color: '#4D5459'
              }
            }
          }
        ],
        series: [
          {
            name: this.$t('dashboard.taskCount.text'),
            type: 'bar',
            data: [],
            barWidth: BAR_CONSTANT_2K.barWidth
            // color: ['#40FAEE']
          },
          {
            name: this.$t('dashboard.workHours.text'),
            type: 'bar',
            data: [],
            barWidth: BAR_CONSTANT_2K.barWidth
            // color: ['#F66813']
          }
        ]
      }
      let width = document.body.clientWidth
      // console.log('width: ' + width)
      if (width > 3000) {
        option.tooltip.textStyle.fontSize = 40
        option.title.textStyle.fontSize = '36'
        option.legend.textStyle.fontSize = '24'
        option.grid.left = '24px'
        option.grid.bottom = '24px'
        option.grid.right = '30px'
        option.grid.top = '100px'
        option.xAxis[0].axisLabel.fontSize = '18'

        option.series[0].barWidth = BAR_CONSTANT_4K.barWidth
        option.series[1].barWidth = BAR_CONSTANT_4K.barWidth

        option.yAxis[0].axisLabel.fontSize = '24'
        option.yAxis[0].nameTextStyle.fontSize = '20'
        option.yAxis[1].axisLabel.fontSize = '24'
        option.yAxis[1].nameTextStyle.fontSize = '20'
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
    loadData(type) {
      if (this.firstLoad) {
        this.chart.showLoading()
      }
      this.getApi()
        .queries(queryId.QUERYSCREEN_BARCHART_TOP10_STAFFNAME_WORKHOURS)
        .then(response => {
          if (response?.data?.query_result?.data) {
            const data = response?.data?.query_result?.data.rows
            if (data && data.length > 0) {
              const option = this.getOption()
              let y0 = [],
                y1 = []
              for (const item of data) {
                y0.push(item['businessVolume'])
                y1.push(item['workHours'])
              }
              let y0max = Math.ceil(Math.ceil(Math.max(...y0)) / 4),
                y1max = Math.ceil(Math.ceil(Math.max(...y1)) / 4)
              let m = y0max / y1max
              for (const item of data) {
                option.xAxis[0].data.push(item['staffName'])
                option.series[0].data.push(item['businessVolume'])
                option.series[1].data.push({ value: item['workHours'] * m + '', workHours: item['workHours'] })
              }
              option.yAxis[0].interval = y0max
              option.yAxis[0].max = y0max * 4
              option.yAxis[1].interval = y1max
              option.yAxis[1].max = y1max * 4
              if (this.firstLoad) {
                this.chart.hideLoading()
                this.firstLoad = false
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
// .chart-pie {
//   width: 100%;
//   height: 259px;
//   border-top: 1px solid #546fb0;
// }

.chart-container2 {
  position: relative;
  height: 280px;
  // border-top: 1px solid #546fb0;
  margin-top: 10px;
  @media screen and (min-width: 3000px) {
    height: 480px;
    margin-top: 20px;
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
.chart-pie {
  position: absolute;
  width: 100%;
  top: 0px;
  left: 0px;
  top: 0px;
  bottom: 0px;
  width: 100%;
  height: 230px;
  margin-top: 40px;
  @media screen and (min-width: 3000px) {
    margin-top: 40px;
    height: 460px;
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

/deep/ .ant-empty-image {
  @media screen and (min-width: 3000px) {
    height: 200px;
  }
}
</style>
