<template>
  <div class="ech">
    <Echart :options="options" :height="height" width="100%"></Echart>
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
              color: '#BF0008'
            },
            {
              offset: 1,
              color: '#BF0008'
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
              color: '#BF0008'
            },
            {
              offset: 1,
              color: '#BF0008'
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
    isPercent: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    ename: {
      type: String,
      default: () => {
        return ''
      }
    },
    height: {
      type: String,
      default: () => {
        return '174px'
      }
    },
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
            formatter: this.isPercent ? '{b} :<br/> {c}%' : '{b} :<br/> {c}',
            textStyle: {
              color: '#fff',
              fontSize: 14
            }
          },
          grid: {
            left: 40,
            right: 15,
            bottom: 28,
            top: 34
          },
          xAxis: {
            type: 'category',
            position: 'bottom',
            axisLine: true,
            axisLabel: {
              color: '#A3A3A3',
              fontSize: 10
            },

            data: newData.weekCategory
          },
          // 下方Y轴
          yAxis: {
            name: this.ename,
            // nameLocation: 'end',
            nameGap: 16,
            nameTextStyle: {
              color: '#000000',
              padding: [0, 0, 0, 40],
              fontSize: 10
            },
            scale: true, //自适应
            min: value => {
              // 百位起最小值向下取整
              return Math.floor(value.min)
            },
            max: value => {
              // 百位起最大值向上取整
              return Math.ceil(value.max)
            },
            // splitNumber: 4,

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
              color: '#A3A3A3',
              fontSize: 10
            }
          },
          series: [
            {
              name: '',
              type: 'line',
              smooth: true,
              silent: true,
              showSymbol: true, //是否默认展示圆点
              symbol: 'circle', // 默认是空心圆（中间是白色的）
              symbolSize: 2,
              itemStyle: {
                color: '#fff', //实圆的背景色
                borderWidth: 2,
                borderColor: '#BF0008'
              },
              lineStyle: {
                normal: {
                  color: this.colorList.linearBtoG,
                  width: 1
                }
              },
              data: newData.weekLineData,
              lineSmooth: true,

              tooltip: {
                position: 'top',
                formatter: '{c} ',
                backgroundColor: 'rgba(28,152,232,.2)',
                padding: 6
              }
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
<style lang="scss" class>
.ech {
  background-color: #f7f8fa;
}
</style>
