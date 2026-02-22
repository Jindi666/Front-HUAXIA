<template>
  <div>
    <!-- 年度开工率 -->
    <Echart :options="options" id="bottomLeftChart" height="300px" width="100%"></Echart>
  </div>
</template>

<script>
import Echart from '@/common/echart'
export default {
  data() {
    return {
      options: {}
    }
  },
  components: {
    Echart
  },
  props: {
    cdata: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    cdata: {
      handler(newData) {
        this.options = {
          tooltip: {
            trigger: 'axis',
            backgroundColor: '#bf0008',
            textStyle: {
              color: '#fff'
            },
            axisPointer: {
              type: 'shadow',
              label: {
                show: true,
                backgroundColor: '#7B7DDC'
              }
            }
          },
          legend: {
            data: ['任务成功次数', '任务总数', '成功率'],
            textStyle: {
              color: '#b71d25'
            },
            top: '0%'
          },
          grid: {
            x: '6%',
            width: '87%',
            y: '9%',
            bottom: 120
          },
          xAxis: {
            data: newData.Deptname,
            axisLabel: {
              interval: 0,
              rotate: 40
            },
            axisLine: {
              lineStyle: {
                color: '#B4B4B4'
              }
            },
            axisTick: {
              show: false
            }
          },
          yAxis: [
            {
              type: 'log',
              splitLine: { show: false },
              axisLine: {
                lineStyle: {
                  color: '#B4B4B4'
                }
              },
              axisLabel: {
                formatter: value => {
                  if (value > 1000) {
                    return value / 1000 + 'k'
                  } else {
                    return value
                  }
                }
              }
            },
            {
              splitLine: { show: false },
              axisLine: {
                lineStyle: {
                  color: '#B4B4B4'
                }
              },
              axisLabel: {
                formatter: '{value}% '
              }
            }
          ],
          series: [
            {
              name: '成功率',
              silent: true,
              type: 'line',
              smooth: false,
              showAllSymbol: true,
              symbol: 'circle',
              symbolSize: 5,
              yAxisIndex: 1,
              itemStyle: {
                normal: {
                  color: '#E31818'
                }
              },
              data: newData.rateData
            },
            {
              name: '任务成功次数',
              silent: true,
              type: 'bar',
              barWidth: 8,
              // barGap: '20',
              itemStyle: {
                normal: {
                  barBorderRadius: 4,
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#A880FF' },
                    { offset: 1, color: '#4782F3' }
                  ])
                }
              },
              data: newData.barData
            },
            {
              name: '任务总数',
              silent: true,
              type: 'bar',
              barGap: '20%',
              barWidth: 8,
              itemStyle: {
                normal: {
                  barBorderRadius: 4,
                  color: '#E76369'
                }
              },
              z: -12,
              data: newData.lineData
            }
          ]
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
