<template>
  <div class="chart-container2">
    <div id="chart" ref="chart" :style="{ visibility: chartVisible }" class="chart-pie"></div>
    <!-- <div class="empty-mask" :style="{ visibility: maskVisible }">
      <a-empty>
        <span slot="description"> {{ $t('public.noData.text') }} </span>
      </a-empty>
    </div> -->
    <div class="empty-mask" :style="{ visibility: maskVisible }">
      <span class="chartTitle">{{ $t('dashboard.workerDepartmentDatav.text') }}</span>
      <a-empty :description="$t('public.noData.text')" image="/img/smallPie.png" />
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import pie from 'echarts/lib/chart/pie'
import { addListener, removeListener } from 'resize-detector'

import dashboardApi from '@/api/dashboard'
import dashboardApiDemo from '../mockApi/dashboardApi.js'
import { chartColors } from '../components/chartColors'

export default {
  name: 'BusinessType',
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
      firstLoad: false,
      intervalObj: null,
      chartVisible: 'hidden',
      maskVisible: 'visible'
    }
  },
  mounted() {
    this.initChart()
    addListener(this.$refs.chart, this.resizeChart)
    this.loadData()

    const that = this
    this.intervalObj = window.setInterval(function() {
      that.loadData()
    }, this.refreshInterval)
  },
  beforeDestroy() {
    removeListener(this.$refs.chart, this.resizeChart)
    window.clearInterval(this.intervalObj)
  },
  methods: {
    getOption() {
      let width = document.body.clientWidth
      if (width > 3000) {
        return {
          grid: {
            top: '24px'
          },
          color: chartColors,
          title: {
            text: this.$t('dashboard.workerDepartmentDatav.text'),
            left: '24',
            top: '0',
            textStyle: {
              color: '#8AABFB',
              fontWeight: 'bold',
              fontSize: '32'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            // type: 'normal',
            orient: 'vertical',
            right: '16',
            bottom: '50',
            data: [],
            formatter: function(val) {
              if (val.length > 8) {
                val = val.substring(0, 7) + '...'
              }
              return val
            },
            textStyle: {
              color: '#fff',
              fontSize: '28'
            },
            icon: 'circle',
            pageIconSize: 16
          },
          series: [
            {
              name: this.$t('dashboard.workerCount.text'),
              type: 'pie',
              // radius: '55%',
              radius: ['35%', '65%'],
              avoidLabelOverlap: false,
              center: ['35%', '55%'],
              data: [],
              label: {
                show: false
              },
              emphasis: {
                show: false,
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
          grid: {
            top: '12px'
          },
          color: chartColors,
          title: {
            text: this.$t('dashboard.workerDepartmentDatav.text'),
            left: '12',
            top: '0',
            textStyle: {
              color: '#8AABFB',
              fontWeight: 'bold',
              fontSize: '16'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            // type: 'normal',
            orient: 'vertical',
            right: '8',
            bottom: '25',
            data: [],
            formatter: function(val) {
              if (val.length > 8) {
                val = val.substring(0, 7) + '...'
              }
              return val
            },
            textStyle: {
              color: '#fff',
              fontSize: '14'
            },
            icon: 'circle',
            pageIconSize: 8
          },
          series: [
            {
              name: this.$t('dashboard.workerCount.text'),
              type: 'pie',
              // radius: '55%',
              radius: ['35%', '65%'],
              avoidLabelOverlap: false,
              center: ['35%', '55%'],
              data: [],
              label: {
                show: false
              },
              emphasis: {
                show: false,
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
      if (this.firstLoad) {
        this.chart.showLoading()
      }
      this.getApi()
        .queryWorkerByDep()
        .then(response => {
          const data = response.data
          if (data && data.length > 0) {
            const option = this.getOption()
            let counter = 0
            for (const item of data) {
              option.legend.data.push(item['name'])
              option.series[0].data.push(item)
              counter++
              if (counter > 8) {
                break
              }
            }
            this.chart.hideLoading()
            this.chartVisible = 'visible'
            this.maskVisible = 'hidden'
            this.chart.setOption(option)
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
  // height: 300px;
  position: relative;
  height: 253px;
  @media screen and (min-width: 3000px) {
    height: 506px;
  }
}
// .chart-pie {
//   width: 100%;
// }
.empty-mask {
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
      font-weight: 1200;
    }
  }
}
.chart-container2 /deep/ .ant-empty-image {
  img {
    width: 98px;
    height: 97px;
    @media screen and (min-width: 3000px) {
      margin-top: 50px;
      width: 196px;
      height: 194px;
    }
  }
}
.chart-container2 /deep/ .ant-empty-description {
  color: rgba(132, 172, 255, 1);
  font-size: 12px;
  margin-top: -7px;
  @media screen and (min-width: 3000px) {
    font-size: 24px;
    margin-top: 164px;
  }
}
.chart-container2 /deep/ .ant-empty {
  margin: 10px 8px 0;
  margin-top: 30px;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  @media screen and (min-width: 3000px) {
    margin: 20px 16px 0;
    margin-top: 60px;
    font-size: 28px;
    line-height: 44px;
  }
}
.chartTitle {
  position: absolute;
  left: 17px;
  top: 0px;
  height: 21px;
  font-size: 16px;
  font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
  font-weight: bold;
  color: #8aabfb;
  line-height: 21px;
  @media screen and (min-width: 3000px) {
    font-size: 32px;
    left: 34px;
    height: 42px;
    line-height: 42px;
  }
}
</style>
