<template>
  <div class="card">
    <div class="title">
      数字员工各环节分布
    </div>
    <div class="content">
      <div id="chart" ref="chart" class="chart-pie"></div>
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
  name: 'digitalEmployees',
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
        return 360000
      }
    }
  },
  data() {
    return {
      chart: null,
      title: '',
      tempData: [],
      interval: null
    }
  },
  mounted() {
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
        this.chart.resize()
      }
    },
    initChart() {
      this.chart = echarts.init(this.$refs.chart)
      this.chart.setOption(this.getOption())
    },
    getOption() {
      let width = document.body.clientWidth
      let that = this
      if (width > 3000) {
        return {
          color: ['#2C6ADD', '#21B58C', '#9EA7B8'],
          legend: {
            orient: 'vertical',
            right: '70',
            top: '160',
            icon: 'circle',
            textStyle: {
              fontSize: 22
            },
            data: []
          },
          series: [
            {
              type: 'pie',
              radius: ['35%', '55%'],
              center: ['40%', '32%'],
              label: {
                normal: {
                  formatter: params => {
                    // console.log(JSON.stringify(params))
                    return '' + params.name + ' ' + params.percent + '%'
                  },
                  fontSize: 28,
                  padding: [0, -180, 35, -180],
                  rich: {
                    icon: {
                      fontSize: 32
                    },
                    name: {
                      fontSize: 30,
                      padding: [0, 20, 0, 4],
                      color: '#666666'
                    },
                    value: {
                      fontSize: 30,
                      fontWeight: 'bold',
                      color: '#333333'
                    }
                  }
                }
              },
              labelLine: {
                show: true,
                length: 0,
                length2: screenScale(7)
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
          legend: {
            orient: 'vertical',
            right: '10',
            top: '60',
            icon: 'circle',
            textStyle: {
              fontSize: 10
            },
            data: []
          },
          series: [
            {
              type: 'pie',
              radius: ['35%', '55%'],
              center: ['40%', '38%'],
              label: {
                normal: {
                  formatter: params => {
                    // console.log(JSON.stringify(params))
                    return '' + params.name + ' ' + params.percent + '%'
                  },
                  fontSize: 12,
                  padding: [0, -80, 25, -90],
                  rich: {
                    icon: {
                      fontSize: 16
                    },
                    name: {
                      fontSize: 14,
                      padding: [0, 20, 0, 4],
                      color: '#666666'
                    },
                    value: {
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#333333'
                    }
                  }
                }
              },
              labelLine: {
                show: true,
                length: 0,
                length2: screenScale(7)
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
      return dashboardApiDemo
    },
    loadData() {
      const that = this
      that.getEmployeesDistributionInfo()
      this.interval = window.setInterval(function() {
        that.getEmployeesDistributionInfo()
      }, this.refreshInterval)
    },
    getEmployeesDistributionInfo() {
      const that = this
      Api.getEmployeesDistributionInfo({}).then(response => {
        const option = that.getOption()
        for (const item of response.data) {
          option.legend.data.push(item.workflow_node_name)
          option.series[0].data.push({ name: item.workflow_node_name, value: item.workflow_node_name_count })
        }
        that.chart.setOption(option)
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
      this.getEmployeesDistributionInfo()
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
    height: 20px;
    text-align: left;
    color: #171d29;
    font-size: 16px;
    font-weight: 700;
    padding: 16px 32px 0px 19px;
    margin-bottom: 29px;
  }
  .content {
    text-align: left;
    padding-left: 6px;
    margin: auto 0;
    display: flex;
    flex-direction: row;

    .chart-pie {
      width: 100%;
      height: 224px;
    }
  }
}
</style>
