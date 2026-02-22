<template>
  <div>
    <Echart :options="options" height="290px" width="100%"></Echart>
  </div>
</template>

<script>
import Echart from '@/common/echart'
export default {
  data() {
    return {
      options: {},
      // 定义颜色
      colorList: {
        linearYtoG: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#f5b44d'
            },
            {
              offset: 1,
              color: '#28f8de'
            }
          ]
        },
        linearGtoB: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: '#43dfa2'
            },
            {
              offset: 1,
              color: '#28f8de'
            }
          ]
        },
        linearBtoG: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: '#F02FC2'
            },
            {
              offset: 1,
              color: '#E5999C'
            }
          ]
        },
        areaBtoG: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(35,184,210,.2)'
            },
            {
              offset: 1,
              color: 'rgba(35,184,210,0)'
            }
          ]
        }
      }
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
          title: {
            text: '',
            textStyle: {
              color: '#D3D6DD',
              fontSize: 20,
              fontWeight: 'normal'
            },
            subtext: newData.weekCategory[6],
            subtextStyle: {
              color: '#000',
              fontSize: 14
            },
            top: 0,
            left: 30
          },
          // legend: {
          //   top: 60,
          //   left: 80,
          //   orient: 'vertical',
          //   itemGap: 15,
          //   itemWidth: 12,
          //   itemHeight: 12,
          //   data: ['平均指标', '我的指标'],
          //   textStyle: {
          //     color: '#b71d25',
          //     fontSize: 14
          //   }
          // },
          tooltip: {
            trigger: 'axis',
            formatter: '{b} :<br/> {c}',
            backgroundColor: '#bf0008',
            textStyle: {
              color: '#fff'
            }
          },
          // radar: {
          //   center: ['68%', '26%'],
          //   radius: '30%',
          //   name: {
          //     color: '#000'
          //   },
          //   splitNumber: 8,
          //   axisLine: {
          //     lineStyle: {
          //       color: this.colorList.linearYtoG,
          //       opacity: 0.6
          //     }
          //   },
          //   splitLine: {
          //     lineStyle: {
          //       color: this.colorList.linearYtoG,
          //       opacity: 0.6
          //     }
          //   },
          //   splitArea: {
          //     areaStyle: {
          //       color: '#fff',
          //       opacity: 0.1,
          //       shadowBlur: 25,
          //       shadowColor: '#000',
          //       shadowOffsetX: 0,
          //       shadowOffsetY: 5
          //     }
          //   },
          //   indicator: [
          //     {
          //       name: 'worker数量',
          //       max: newData.radarData[0] + 20
          //     },
          //     {
          //       name: '使用用户数量',
          //       max: newData.radarData[1] + 20
          //     },
          //     {
          //       name: '流程数量',
          //       max: newData.radarData[2] + 30
          //     },
          //     {
          //       name: '任务数量',
          //       max: newData.radarData[3] + 1000
          //     }
          //   ]
          // },
          grid: {
            left: 30,
            right: 50,
            bottom: 40,
            top: 50
          },
          xAxis: {
            type: 'category',
            position: 'bottom',
            axisLine: true,
            axisLabel: {
              color: '#000',
              fontSize: 12
            },
            data: newData.weekCategory
          },
          // 下方Y轴
          yAxis: {
            name: '',
            nameLocation: 'end',
            nameGap: 24,
            nameTextStyle: {
              color: '#000',
              fontSize: 14
            },

            splitNumber: 4,

            axisLine: {
              lineStyle: {
                opacity: 0
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#000',
                opacity: 0.1
              }
            },
            axisLabel: {
              color: '#000',
              fontSize: 12,
              formatter: value => {
                if (value >= 1000) {
                  return value / 1000 + 'k'
                } else {
                  return value
                }
              }
            }
          },
          series: [
            {
              name: '',
              type: 'line',
              smooth: false,
              symbol: 'circle',
              silent: true,
              symbolSize: 5,
              itemStyle: {
                normal: {
                  color: '#B71E25'
                }
              },
              lineStyle: {
                normal: {
                  color: '#E31818',
                  width: 2
                }
              },
              areaStyle: {
                normal: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: 'rgba(183, 30, 37, 0.5)'
                      },
                      {
                        offset: 1,
                        color: 'rgba(183, 30, 37, 0)'
                      }
                    ]
                  }
                }
              },
              data: newData.weekLineData,
              // lineSmooth: true,
              markLine: {
                silent: true,
                data: [
                  {
                    type: 'average',
                    name: '平均值'
                  }
                ],
                precision: 0,
                label: {
                  normal: {
                    formatter: '平均值: \n {c}'
                  }
                },
                lineStyle: {
                  normal: {
                    color: '#B71E25'
                  }
                }
              }
              // tooltip: {
              //   position: 'top',
              //   formatter: '{b}: \n {c} ',
              //   backgroundColor: 'rgba(28,152,232,.2)',
              //   padding: 6
              // }
            },
            {
              name: '占位背景',
              type: 'bar',
              itemStyle: {
                normal: {
                  show: true,
                  color: '#000',
                  opacity: 0
                }
              },
              silent: true,
              barWidth: '50%',
              data: newData.weekMaxData,
              animation: false
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
