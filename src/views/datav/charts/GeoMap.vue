<template>
  <div id="chart" ref="chart" class="chart-map"></div>
</template>

<script>
import axios from 'axios'
import echarts from 'echarts'
import map from 'echarts/lib/chart/map'
import dashboardApiDemo from '../mockApi/dashboardApi.js'
import Api from '@/api/datav.js'
import { addListener, removeListener } from 'resize-detector'
import { screenScale } from '@/utils/util'

const symboleSizeValue = {
  min: 99999999,
  max: 0
}

const Pro = ['北京市', '黑龙江省', '陕西省', '四川省']
const warehouseList = [
  // { name: '北京', value: [116.352963, 40.409079], quantity: 159.5, unit: '吨' },
  // { name: '上海', value: [121.463615, 31.195908], quantity: 85.5, unit: '吨' },
  // { name: '武汉', value: [114.311582, 30.598467], quantity: 55.5, unit: '吨' },
  // { name: '郑州', value: [113.631419, 34.753439], quantity: 12.5, unit: '吨' },
  // { name: '深圳', value: [114.064552, 22.548457], quantity: 13.4, unit: '吨' },
  // { name: '柳州', value: [109.434422, 24.331961], quantity: 568.2, unit: '吨' },
  // { name: '河池', value: [108.084407, 24.692636], quantity: 876.2, unit: '吨' },
  // { name: '来宾', value: [109.231766, 23.745056], quantity: 133.2, unit: '吨' },
  // { name: '梧州', value: [111.276157, 23.507642], quantity: 235.2, unit: '吨' }
]
const cityData = [
  { region: '大庆', log: 125.03, lat: 46.58, taskCount: Math.round(Math.random() * 10000) },
  { region: '北京', log: 117.348611, lat: 40.581141, taskCount: Math.round(Math.random() * 10000) },
  { region: '西安', log: 108.95, lat: 34.27, taskCount: Math.round(Math.random() * 10000) },
  { region: '成都', log: 104.06, lat: 30.67, taskCount: Math.round(Math.random() * 10000) }
]

const convertData = function(data, mapData) {
  const items = []
  // for (const a of data) {
  //   a.taskCount = Math.round(Math.sqrt(a.taskCount))
  //   // a.taskCount = Math.round(Math.sqrt(a.taskCount))
  // }
  symboleSizeValue.max = 0
  symboleSizeValue.min = 999999999
  // console.log(JSON.stringify(data))
  // console.log(JSON.stringify(mapData))
  for (const d of data) {
    // for (const r of mapData) {
    // if (d.lat === r.lat) {
    // console.log(d.region)
    // const pp = r.cp
    // //         //   { name: '东莞', value: [113.75, 23.04, 222] }
    items.push({ name: d.dept_name_L1, value: [d.longitude, d.latitude], taskCount: d.dept_name_L1_count })
    // if (d.taskCount < symboleSizeValue.min) symboleSizeValue.min = d.taskCount
    // if (d.taskCount > symboleSizeValue.max) symboleSizeValue.max = d.taskCount
    // }
    // }
  }
  return items
}

export default {
  name: 'GeoMap',
  props: {
    refreshInterval: {
      type: Number,
      default: function() {
        return 360000
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
      mapData: null,
      totalNum: 0,
      interval: null
    }
  },
  mounted() {
    this.initChart()
    addListener(this.$refs.chart, this.resizeChart)

    screenScale(1)
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
    getOption() {
      return {
        // tooltip: {
        //   trigger: 'item',
        //   formatter: obj => {
        //     return `${obj.name} <br/> ${this.$t('datav.geoMapTask.text')}${obj.value[2]}`
        //   }
        // },
        grid: {
          left: 0,
          bottom: 0,
          right: 0,
          top: 10
        },
        geo: {
          show: true,
          map: 'fullmap',
          zoom: 1.2,
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false,
              color: '#fff'
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: '#fff',
              borderColor: '#6D788F'
            },
            emphasis: {
              areaColor: '#B3D7FF'
            }
          },
          center: [104, 31],
          regions: [
            {
              name: '四川省',
              itemStyle: {
                normal: {
                  opacity: 1, // 透明度
                  areaColor: '#B3D7FF' // 整个省份的颜色
                }
              }
            },
            {
              name: '陕西省',
              itemStyle: {
                normal: {
                  opacity: 1, // 透明度
                  areaColor: '#B3D7FF' // 整个省份的颜色
                }
              }
            },
            {
              name: '北京市',
              itemStyle: {
                normal: {
                  opacity: 1, // 透明度
                  areaColor: '#B3D7FF' // 整个省份的颜色
                }
              }
            },
            {
              name: '黑龙江省',
              itemStyle: {
                normal: {
                  opacity: 1, // 透明度
                  areaColor: '#B3D7FF' // 整个省份的颜色
                }
              }
            }
          ]
        },
        series: [
          {
            name: this.$t('dashboard.runCount.text'),
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: warehouseList,
            // symbolSize: function(val) {
            //   return Math.sqrt(val[2] / symboleSizeValue.max) * 12
            // },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            label: {
              normal: {
                formatter: params => {
                  let str = `{value|${params.data.taskCount}}` + '\n' + `{name|${params.name}}`
                  return str
                },
                position: 'top',
                fontSize: 13,
                borderWidth: 5,
                borderRadius: 5,
                padding: [screenScale(0.5), screenScale(0.8)],
                lineHeight: screenScale(1.4),
                show: true,
                align: 'center',
                color: '#fff',
                backgroundColor: '#2C6ADD',
                rich: {
                  value: {
                    color: '#fff',
                    fontSize: screenScale(1.2)
                  },
                  name: {
                    color: '#fff',
                    fontSize: screenScale(1)
                  }
                }
              }
            },
            itemStyle: {
              color: '#0242CC',
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
      if (this.demoMode) {
        return dashboardApiDemo
      }
    },
    initChart() {
      this.chart = echarts.init(this.$refs.chart)
      this.chart.showLoading()

      axios.get('/cockpitscreen/geo/100000.json').then(resp => {
        this.chart.hideLoading()
        const geoJson = resp.data
        echarts.registerMap('fullmap', geoJson)
        let mapData = []
        // geoJson.features.map(function(item) {
        //   if (Pro.indexOf(item.properties.name) > 0) {
        //     item.geometry.coordinates.map(function(ite) {
        //       mapData.push({
        //         log: ite[0],
        //         lat: ite[1]
        //       })
        //     })
        //   }
        // })
        // const mapData = geoJson.features.geometry.coordinates.map(function(item) {
        //   return {
        //     log: item[0],
        //     // value: item.properties.childrenNum,
        //     lat: item[1]
        //   }
        // })

        this.mapData = mapData
        const option = this.getOption()
        this.chart.setOption(option)

        this.loadData()
      })
    },
    loadData() {
      const that = this
      that.getEmployeesCount()
      this.interval = window.setInterval(function() {
        that.getEmployeesCount()
      }, this.refreshInterval)
    },
    getEmployeesCount() {
      const that = this
      let totalNum = 0
      Api.getEmployeesCount({}).then(response => {
        // this.totalNum = 0
        const data = response.data
        if (data) {
          const option = this.getOption()
          const dataToDisplay = convertData(data, this.mapData)
          // console.log(JSON.stringify(dataToDisplay))
          for (const item of data) {
            totalNum += item.dept_name_L1_count
          }
          this.$emit('totalNum', totalNum)
          option.series[0].data = dataToDisplay
          this.chart.setOption(option)
        }
      })
    }
  }
}
</script>

<style scoped>
.chart-map {
  width: 100%;
  height: 100%;
  z-index: 0;
}
</style>
