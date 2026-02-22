<template>
  <div>
    <Echart :options="options" height="100%" width="100%"></Echart>
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
      type: Array,
      default: () => []
    }
  },
  watch: {
    cdata: {
      handler(newData) {
        this.options = {
          tooltip: {
            show: true,
            formatter: function(params) {
              return params.name + '\n' + '离线：' + params.data.workerOffline + '\n' + '总数：' + params.data.workerCount
            }
          },
          backgroundColor: '#FFCED0',
          series: [
            {
              name: '',
              type: 'treemap',
              backgroundColor: '#FFCED0',
              leafDepth: 1,
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              orient: 'RL',
              textStyle: {
                color: '#000'
              },
              breadcrumb: {
                show: false,
                itemStyle: {
                  color: '#FFCED0'
                }
              },
              data: this.cdata,
              label: {
                color: '#000',
                show: true,
                formatter: function(params) {
                  if (params.data.value <= 0.1) {
                    if (params.data.workerCount) {
                      return params.data.workerOffline + '/' + params.data.workerCount + ' ' + params.name
                    } else {
                      return ''
                    }
                  } else {
                    if (params.data.workerCount) {
                      return params.data.workerOffline + '/' + params.data.workerCount + '\n' + params.name
                    } else {
                      return ''
                    }
                  }
                },
                fontSize: 12
              },
              nodeClick: 'none',
              roam: false,
              levels: [
                {
                  colorSaturation: [0.4, 0.5, 0.6],
                  colorMappingBy: 'value',
                  color: ['#FFCED0', '#FFCED0'],
                  itemStyle: {
                    borderColor: '#FFE4E6',
                    borderWidth: 0,
                    gapWidth: 5
                  }
                },
                {
                  colorSaturation: [0.4, 0.5, 0.6],
                  colorMappingBy: 'value',
                  color: ['#FFCED0', '#FFCED0'],
                  itemStyle: {
                    borderColor: '#FFE4E6',
                    borderWidth: 0,
                    gapWidth: 1
                  }
                },
                {
                  colorSaturation: [0.4, 0.5, 0.6],
                  colorMappingBy: 'value',
                  color: ['#FFCED0', '#FFCED0'],
                  itemStyle: {
                    borderColor: '#FFE4E6',
                    borderWidth: 0,
                    gapWidth: 1
                  }
                }
              ]
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
