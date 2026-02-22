<template>
  <div id="chart" ref="chart" class="chart-map"></div>
</template>

<script>
import axios from 'axios'
import echarts from 'echarts'
import map from 'echarts/lib/chart/map'
import dashboardApi from '@/api/dashboard'
import { dashColors } from '../DashColors'

const symboleSizeValue = {
  min: 99999999,
  max: 0
}

const convertData = function(data, mapData) {
  const items = []
  symboleSizeValue.max = 0
  symboleSizeValue.min = 999999999
  for (const d of data) {
    for (const r of mapData) {
      if (d.region === r.name) {
        const pp = r.cp
        //         //   { name: '东莞', value: [113.75, 23.04, 222] }
        items.push({ name: d.region, value: [pp[0], pp[1], d.taskCount] })
        // d.taskCount = Math.round(Math.sqrt(d.taskCount))
        if (d.taskCount < symboleSizeValue.min) symboleSizeValue.min = d.taskCount
        if (d.taskCount > symboleSizeValue.max) symboleSizeValue.max = d.taskCount
      }
    }
  }
  return items
}

export default {
  name: 'GeoMap',
  props: {
    refreshInterval: {
      type: Number,
      default: function() {
        return 3000
      }
    },

    type: {
      type: Number,
      default: function() {
        return 1
      }
    },
    mapCode: {
      type: String,
      default: function() {
        return '100000'
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
      mapData: null
    }
  },
  watch: {
    type: function(val) {
      this.loadData(val)
    }
  },
  mounted() {
    this.initChart()
  },

  methods: {
    getOption() {
      let vm = this
      return {
        color: dashColors,
        tooltip: {
          trigger: 'item',
          formatter: function(obj) {
            return `${obj.name} <br/> ${vm.$t('dashboard.task.text')}：${obj.value[2]}`
          }
        },
        grid: {
          left: 0,
          bottom: 0,
          right: 0,
          top: 10
        },
        geo: {
          show: true,
          map: 'map',
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: true,
              color: '#fff'
            }
          },
          // roam: true,
          itemStyle: {
            normal: {
              areaColor: '#ECEEF0',
              borderColor: '#6E77A1'
            },
            emphasis: {
              areaColor: '#2B91B7'
            }
          },
          zoom: 1.1
          // center: [113.23, 23.16]
        },
        series: [
          {
            name: this.$t('dashboard.taskCount.text'),
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: [],
            symbolSize: function(val) {
              return Math.sqrt(val[2] / symboleSizeValue.max) * 12
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            label: {
              formatter: '{b}',
              position: 'right',
              show: false
            },
            itemStyle: {
              color: '#1F77F3',
              showBlur: true
            },
            emphasis: {
              mapValueCalculation: 'sum',
              label: {
                show: true
              }
            }
          }
        ]
      }
    },
    getApi() {
      return dashboardApi
    },
    initChart() {
      this.chart = echarts.init(this.$refs.chart)
      this.chart.showLoading()

      axios.get(`/geo/${this.mapCode}_full.json`).then(resp => {
        // console.log(resp)
        this.chart.hideLoading()
        const geoJson = resp.data
        echarts.registerMap('map', geoJson)

        const mapData = geoJson.features.map(function(item) {
          return {
            name: item.properties.name,
            // value: item.properties.childrenNum,
            cp: item.properties.center
          }
        })

        this.mapData = mapData
        const option = this.getOption()
        this.chart.setOption(option)

        this.loadData(1)
      })
    },
    loadData(type) {
      this.getApi()
        .queryTaskRegions(type)
        .then(response => {
          if (response.code === 0) {
            const data = response.data
            const option = this.getOption()
            const dataToDisplay = convertData(data, this.mapData)
            option.series[0].data = dataToDisplay
            this.chart.setOption(option)
          } else {
            this.$message.error(response.message)
          }
        })
    }
  }
}
</script>

<style scoped>
.chart-map {
  width: 100%;
  height: 300px;
}
</style>
