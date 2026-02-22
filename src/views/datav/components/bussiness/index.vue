<template>
  <div class="card">
    <div class="title">
      业务处理状态发布
    </div>
    <div class="content">
      <div class="success-card">
        <div id="chart" ref="chart" class="chart-pie"></div>
      </div>
      <div class="failed-card">
        <div id="chart2" ref="chart2" class="chart-pie"></div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import dashboardApiDemo from '../../mockApi/dashboardApi.js'
import Api from '@/api/datav.js'
import { addListener, removeListener } from 'resize-detector'
import { screenScale } from '@/utils/util'
export default {
  name: 'bussiness',
  props: {
    failed: {
      type: Number,
      default: function() {
        return 1
      }
    },
    refreshInterval: {
      type: Number,
      default: function() {
        return 60000
      }
    }
  },
  data() {
    return {
      chart: null,
      chart2: null,
      interval: null
    }
  },
  mounted() {
    // console.log('mounted')
    this.initChart()
    this.loadData()
    addListener(this.$refs.chart, this.resizeChart)
  },
  beforeDestroy() {
    window.clearInterval(this.interval)
    removeListener(this.$refs.chart, this.resizeChart)
  },
  methods: {
    resizeChart() {
      if (this.chart) {
        let chartD = this.chart.getOption().series[0].data
        let chart2D = this.chart2.getOption().series[0].data
        let option = this.getOption(),
          option2 = this.getOption()
        if (chartD.length > 0) option.title.text = '成功'
        if (chart2D.length > 0) option2.title.text = '失败'
        option.series[0].data = chartD
        option2.series[0].data = chart2D
        option2.title.textStyle.color = '#BD0B11'
        this.chart.setOption(option)
        this.chart2.setOption(option2)
        this.chart.resize()
        this.chart2.resize()
      }
    },
    initChart() {
      this.chart = echarts.init(this.$refs.chart)
      this.chart.setOption(this.getOption())
      this.chart2 = echarts.init(this.$refs.chart2)
      this.chart2.setOption(this.getOption())
    },
    getOption() {
      let width = document.body.clientWidth
      let that = this
      if (width > 3000) {
        return {
          color: ['#2C6ADD', '#21B58C', '#9EA7B8'],
          title: {
            text: '',
            top: screenScale(3.5),
            x: 'center',
            textStyle: {
              color: '#21B58C',
              fontSize: screenScale(1)
            }
          },
          series: [
            {
              type: 'pie',
              radius: ['30%', '45%'],
              center: ['50%', '35%'],
              label: {
                normal: {
                  formatter: params => {
                    // console.log(JSON.stringify(params))
                    return '' + params.name + ' ' + params.percent + '%'
                  },
                  // formatter: params => {
                  //   let str = that.makeMultiLine(params.name, params.percent)
                  //   return str
                  // },
                  fontSize: 28,
                  padding: [0, -180, 48, -180],
                  rich: {
                    icon: {
                      fontSize: '28'
                    },
                    name: {
                      fontSize: 14,
                      padding: [0, 0, 0, 0],
                      color: '#666666'
                    },
                    value: {
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#333333'
                    }
                  }
                }
              },
              labelLine: {
                show: true,
                length: 0,
                length2: screenScale(7.8)
              },
              data: [],
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
      } else {
        return {
          color: ['#2C6ADD', '#21B58C', '#9EA7B8'],
          title: {
            text: '',
            // left: screenScale(10.4),
            top: screenScale(3.4),
            x: 'center',
            // y: 'center',
            textStyle: {
              color: '#21B58C',
              fontSize: screenScale(1)
            }
          },
          series: [
            {
              type: 'pie',
              radius: ['30%', '45%'],
              center: ['50%', '35%'],
              label: {
                fontSize: 28,
                normal: {
                  formatter: params => {
                    // console.log(JSON.stringify(params))
                    return '' + params.name + ' ' + params.percent + '%'
                  },
                  // formatter: ['{name|{b}}', '{value|{d}%}'].join('\n'),
                  // formatter: params => {
                  //   let txt = '' + params.name + ' ' + params.percent + '%'
                  //   // console.log(JSON.stringify(params))
                  //   return '<div>' + txt + '</div>'
                  // },
                  // formatter: params => {
                  //   let str = that.makeMultiLine(params.name, params.percent)
                  //   return str
                  // },
                  padding: [0, -80, 25, -80],
                  rich: {
                    name: {
                      fontSize: 12,
                      color: '#666666',
                      align: 'auto'
                    },
                    value: {
                      fontSize: 12,
                      color: '#666666',
                      align: 'auto'
                    }
                  }
                }
              },
              labelLine: {
                show: true,
                length: 0,
                length2: screenScale(7.8)
              },
              data: [],
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
      }
    },
    makeMultiLine(str, val) {
      const strs = str.split('')
      const len = strs.length
      if (len < 7) {
        return str + '\n' + val + '%'
      }
      let result = ''
      strs.forEach((_, index) => {
        result += _
        if ((index + 1) % 6 === 0 && index < len - 1) {
          result += '\n'
        }
      })
      return result + val + '%'
    },
    getApi() {
      return dashboardApiDemo
    },
    loadData() {
      const that = this
      that.getProcessedInfo()
      this.interval = window.setInterval(function() {
        that.getProcessedInfo()
      }, this.refreshInterval)
    },
    getProcessedInfo() {
      const that = this
      Api.getProcessedInfo({}).then(response => {
        // if (response.data.length > 0) {
        const option = that.getOption()
        const option2 = that.getOption()
        option2.title.textStyle.color = '#BD0B11'
        for (const item of response.data) {
          option.series[0].data.push({ name: item.operate_type, value: item.totalSuccess_business })
          option2.series[0].data.push({ name: item.operate_type, value: item.totalFailed_business })
        }
        if (option.series[0].data.length > 0) {
          option.title.text = '成功'
        }
        that.chart.setOption(option)
        if (option2.series[0].data.length > 0) {
          option2.title.text = '失败'
        }
        that.chart2.setOption(option2)

        // }
      })
    }
  },
  computed: {
    departmentId() {
      return this.$store.state.dataVUser.select_department_id
    }
  },
  watch: {
    departmentId: function(newVal, oldVal) {
      this.getProcessedInfo()
    }
  }
}
</script>
<style scoped lang="less">
.card {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background: #fff;

  .title {
    width: 100%;
    height: 32px;
    text-align: left;
    color: #171d29;
    font-size: 16px;
    font-weight: 700;
    padding: 16px 32px 16px 19px;
    margin-bottom: 29px;
  }
  .content {
    text-align: left;
    padding-left: 6px;
    margin: auto 0;

    .success-card {
      box-sizing: border-box;
      width: 92%;
      height: 8rem;
      background: #f7f8fa;

      border-left: 4px solid #21b58c;
      border-radius: 8px;
      flex: none;
      order: 2;
      align-self: stretch;
      flex-grow: 0;
      margin-left: 3.5%;
    }

    .failed-card {
      box-sizing: border-box;
      width: 92%;
      height: 8rem;
      background: #f7f8fa;

      border-left: 4px solid #e31818;
      border-radius: 8px;
      flex: none;
      order: 2;
      align-self: stretch;
      flex-grow: 0;
      margin-top: 1rem;
      margin-left: 3.5%;
    }

    .chart-pie {
      margin: 0 auto;
      width: 90%;
      height: 12rem;
    }
  }
}
</style>
