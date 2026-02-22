<template>
  <div>
    <Echart :options="options" height="400px" width="450px"></Echart>
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
          color: ['#998787', '#B71E25', '#F4732F', '#F9971F', '#FFDB92', '#93BE6E', '#e7bcf3', '#8378ea'],
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },

          legend: {
            orient: 'vertical',
            icon: 'circle',
            itemHeight: 11,
            top: 60,
            left: 270,
            x: 'left', // 靠左显示，不写此项默认居中显示
            y: 'center',
            data: newData.xData,
            textStyle: {
              color: '#3D475C',
              fontSize: 13
            },
            formatter: function(tags) {
              let target
              let i = 0,
                l = newData.xData.length
              for (; i < l; i++) {
                if (newData.xData[i] == tags) {
                  target = newData.xData[i]
                }
              }
              // const arr1 = tags.split('-')
              // if (arr1.length > 1) {
              //   return arr1[0] + '\n' + arr1[1]
              // }
              return tags
            }
          },
          series: [
            {
              type: 'pie',
              radius: [65, 100],
              // roseType: 'area',
              center: ['31%', '34%'],
              label: {
                normal: {
                  show: false
                }
              },
              // itemStyle: {
              //   normal: {
              //     lable: {
              //       show: false
              //     },
              //     lableLine: {
              //       show: false
              //     }
              //   },
              //   emphasis: {
              //     lable: {
              //       show: false
              //     }
              //   }
              // },
              data: newData.seriesData
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

<style lang="scss" scoped></style>
