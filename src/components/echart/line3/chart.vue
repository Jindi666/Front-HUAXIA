<template>
  <div class="ech">
    <Echart :options="options" :height="height" width="100%"></Echart>
  </div>
</template>

<script>
import Echart from '@/common/echart'
import { forEach } from 'lodash'
const colorList = [
  '#B71E25',
  '#998686',
  '#93BE6E',
  '#FFC26D',
  '#F9971F',
  '#F4732F',
  '#FF4794',
  '#D93DD3',
  '#891ECB',
  '#575EFF',
  '#57A4FF',
  '#00E2BA',
  '#007D05',
  '#31291C',
  '#799BC2',
  '#B71E25',
  '#998686',
  '#93BE6E',
  '#FFC26D',
  '#F9971F',
  '#F4732F'
]
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
        return '126px'
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
        let series = [],
          legendData = [],
          serDatas = newData.serDatas
        for (let i = 0; i < serDatas.length; i++) {
          let ser = {
            name: serDatas[i].name,
            type: 'line',
            smooth: true,
            silent: true,
            showAllSymbol: true,
            symbolSize: 3,
            symbol: 'circle',
            lineStyle: {
              normal: {
                color: colorList[i],
                width: 1
              }
            },
            data: serDatas[i].data,
            lineSmooth: true
          }
          legendData.push(serDatas[i].name)
          series.push(ser)
        }
        this.options = {
          title: {
            text: this.ename,
            textStyle: {
              //文字颜色
              color: '#A3A3A3',
              fontSize: 10
            }
          },
          color: colorList,
          legend: {
            orient: 'vertical',
            icon: 'circle',
            data: legendData,
            textStyle: {
              color: '#6D788F',
              fontSize: 12
            },
            itemHeight: 11,
            top: 5,
            right: 5,
            formatter: function(tags) {
              let target
              const arr1 = tags.split('-')
              if (arr1.length > 1) {
                target = arr1[0] + arr1[1]
              } else {
                target = arr1[0]
              }

              if (target.length > 5) {
                target = target.slice(0, 5) + '\n' + target.slice(5, target.length)
              }
              console.log(target)
              return target
            }
          },
          tooltip: {
            trigger: 'axis',
            backgroundColor: '#bf0008',
            formatter: function(params) {
              // 自定义提示框内容
              var res = '<div>' + params[0].name + '</div>'
              for (var i = 0, l = params.length; i < l; i++) {
                res += '<div>' + params[i].seriesName + ' : ' + params[i].value + '%' + '</div>'
              }
              return res
            },
            textStyle: {
              color: '#fff',
              fontSize: 14
            }
          },
          grid: {
            left: 40,
            right: legendData.length > 9 ? 235 : 135,
            bottom: 20,
            top: 34
          },
          xAxis: {
            type: 'category',
            axisLabel: {
              color: '#A3A3A3',
              fontSize: 10
            },
            data: newData.week
          },
          yAxis: {
            type: 'value',
            splitLine: {
              show: true,
              lineStyle: {
                color: '#000',
                opacity: 0.1
              }
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
            axisLine: {
              lineStyle: {
                opacity: 0
              }
            },
            axisLabel: {
              color: '#A3A3A3',
              fontSize: 10,
              formatter: value => {
                return value
              }
            }
          },
          series: series
        }
        console.log(new Date().getTime())
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
