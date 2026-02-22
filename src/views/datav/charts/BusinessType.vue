<template>
  <div class="chart-container2" @click="pieClick">
    <div id="chart" ref="chart" class="chart-pie"></div>
    <div class="mask">
      <span class="chartTitle">{{ title }}</span>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import pie from 'echarts/lib/chart/pie'
import { addListener, removeListener } from 'resize-detector'
import { chartColors, chartColors2 } from '../components/chartColors'
import { linearColor } from '../constant'

import dashboardApi from '@/api/dashboard'
import dashboardApiDemo from '../mockApi/dashboardApi.js'

export default {
  name: 'BusinessType',
  props: {
    refreshInterval: {
      type: Number,
      default: function() {
        return 30000
      }
    },
    num: {
      type: Number,
      default: function() {
        return 0
      }
    },
    demoMode: {
      type: Boolean,
      default: function() {
        return false
      }
    },
    typeId: {
      type: String,
      default: function() {
        return '2900'
      }
    }
  },
  data() {
    return {
      chart: null,
      intervalRefresh: null,
      title: '',
      tempData: []
    }
  },
  watch: {
    refreshInterval: function(val) {
      window.clearInterval(this.intervalRefresh)
      const that = this
      this.intervalRefresh = window.setInterval(function() {
        that.loadData()
      }, this.refreshInterval)
    },
    num: function(val) {
      this.loadData()
    }
  },
  mounted() {
    this.initChart()
    addListener(this.$refs.chart, this.resizeChart)
    // this.loadData()

    const that = this
    this.intervalRefresh = window.setInterval(function() {
      that.loadData()
    }, this.refreshInterval)
  },
  beforeDestroy() {
    removeListener(this.$refs.chart, this.resizeChart)
    window.clearInterval(this.intervalRefresh)
  },
  methods: {
    pieClick() {
      console.log(this.typeId)
      this.$emit('pieClick', this.typeId)
    },
    getOption() {
      let width = document.body.clientWidth
      let that = this
      if (width > 3000) {
        return {
          // color: chartColors,
          color: linearColor(),
          // color: ['#FFB761', '#FA694C', '#7AC850', '#50CEFE', '#50CEFE', '#727ACB'],
          title: {
            text: '',
            left: 'center',
            bottom: 'center',
            textStyle: {
              color: '#fff',
              fontSize: '50'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: function(val) {
              console.log(val)
              return `${that.tempData[val.dataIndex].toolName} <br/> ${val.value}   (${val.percent}%)`
            },
            //  '{a0} <br/>{b} {c}   ({d}%)',
            textStyle: {
              fontSize: 40
            }
          },
          legend: {
            selectedMode: true,
            type: 'scroll',
            orient: 'vertical',
            // right: '16',
            show: false,
            bottom: '50',
            data: [],
            formatter: function(val) {
              // console.log(this.getOption.series[0].data)
              console.log(val)
              // if (val.length > 8) {
              //   val = val.substring(0, 7) + '...'
              // }
              // return val
            },
            textStyle: {
              color: '#fff',
              fontSize: '22'
            },
            icon: 'circle',
            pageIconSize: 16
          },
          series: [
            {
              name: this.num,
              type: 'pie',
              radius: ['40%', '70%'],
              label: {
                show: false
              },
              data: [],
              emphasis: {
                itemStyle: {
                  shadowBlur: 20,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      } else {
        return {
          color: linearColor(),
          // color: ['#FFB761', '#FA694C', '#7AC850', '#50CEFE', '#50CEFE', '#727ACB'],
          title: {
            text: '',
            left: 'center',
            bottom: 'center',
            textStyle: {
              color: '#fff',
              fontSize: '25'
            }
          },
          tooltip: {
            trigger: 'item', //'item',
            formatter: function(val) {
              return `${that.tempData[val.dataIndex].toolName} <br/> ${val.value}   (${val.percent}%)`
            },
            textStyle: {
              fontSize: '15'
            },
            show: true //显示提示框
          },
          legend: {
            selectedMode: true,
            type: 'scroll',
            orient: 'vertical',
            left: '0',
            bottom: '95',
            show: false,
            data: [],
            formatter: function(val) {
              // if (val.length > 8) {
              //   val = val.substring(0, 7) + '...'
              // }
              return val
            },
            textStyle: {
              color: '#fff',
              fontSize: '14px'
            },
            icon: 'circle',
            pageIconSize: 8
          },
          series: [
            {
              name: this.title,
              type: 'pie',
              radius: ['35%', '65%'],
              left: '0',
              label: {
                show: false,
                fontSize: 10,
                color: 'fff',
                formatter: '{d}%' // 显示百分比，
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
    getApi() {
      if (this.demoMode) {
        return dashboardApiDemo
      } else {
        return dashboardApi
      }
    },
    resizeChart() {
      if (this.chart) {
        this.chart.resize()
      }
    },
    initChart() {
      this.chart = echarts.init(this.$refs.chart)
      this.chart.setOption(this.getOption())
    },
    loadData(type) {
      let that = this
      this.getApi()
        .queries(this.typeId)
        .then(response => {
          // console.log(JSON.stringify(response.data.query_result.data.rows))
          const rows = response.data.query_result.data.rows
          that.tempData = rows
          // console.log(rows)
          if (rows) {
            that.title = rows[0].areaName
            const option = that.getOption()
            // that.num = 0
            for (const item of rows) {
              option.legend.data.push(item.toolName)
              option.series[0].data.push(item.toolCount)
              // that.num += item.toolCount
            }
            option.title.text = that.num + ''
            // console.log(option.legend.data)
            that.chart.setOption(option)
          }
        })
    }
  }
}
</script>

<style scoped lang="less">
.chart-container2 {
  position: relative;
  height: 200px;
  @media screen and (min-width: 3000px) {
    height: 400px;
  }
}
// .chart-pie {
//   width: 100%;
// }
.mask {
  text-align: center;
  padding-top: 38px;
  position: absolute;
  width: 100%;
  top: 0px;
  left: 0px;
  top: 0px;
  bottom: 0px;
  color: white;
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
    font-weight: 600;
    margin-left: 1em;
    @media screen and (min-width: 3000px) {
      font-size: 32px;
    }
  }
}
// .chart-container2 /deep/ .ant-empty-image {
//   img {
//     width: 98px;
//     height: 97px;
//     @media screen and (min-width: 3000px) {
//       width: 196px;
//       height: 194px;
//     }
//   }
// }
// .chart-container2 /deep/ .ant-empty-description {
//   color: rgba(132, 172, 255, 1);
//   font-size: 12px;
//   margin-top: -7px;
//   @media screen and (min-width: 3000px) {
//     font-size: 24px;
//     margin-top: -14px;
//   }
// }
// .chart-container2 /deep/ .ant-empty {
//   margin: 10px 8px 0;
//   margin-top: 30px;
//   font-size: 14px;
//   line-height: 22px;
//   text-align: center;
//   @media screen and (min-width: 3000px) {
//     margin: 20px 16px 0;
//     margin-top: 60px;
//     font-size: 28px;
//     line-height: 44px;
//   }
// }
.chartTitle {
  position: absolute;
  left: 28%;
  bottom: 0px;
  height: 21px;
  font-size: 16px;
  font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
  // font-weight: bold;
  color: #fff;
  line-height: 21px;
  @media screen and (min-width: 3000px) {
    font-size: 32px;
    // left: 34px;
    height: 42px;
    line-height: 42px;
  }
}
</style>
