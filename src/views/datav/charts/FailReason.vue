<!--<template>-->
<!--  <div id="chart" ref="chart" class="chart-pie"></div>-->
<!--</template>-->

<!--<script>-->
<!--import echarts from 'echarts'-->
<!--import pie from 'echarts/lib/chart/pie'-->
<!--import { addListener, removeListener } from 'resize-detector'-->

<!--const options = {}-->

<!--export default {-->
<!--  name: 'FailReasonPie',-->
<!--  props: {-->
<!--    refreshInterval: {-->
<!--      type: Number,-->
<!--      default: function() {-->
<!--        return 3000-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      chart: null,-->
<!--      intervalRefresh: null-->
<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--    this.initChart()-->
<!--    addListener(this.$refs.chart, this.resizeChart)-->
<!--  },-->
<!--  beforeDestroy() {-->
<!--    removeListener(this.$refs.chart, this.resizeChart)-->
<!--  },-->
<!--  methods: {-->
<!--    resizeChart() {-->
<!--      if (this.chart) {-->
<!--        this.chart.resize()-->
<!--      }-->
<!--    },-->
<!--    initChart() {-->
<!--      this.chart = echarts.init(this.$refs.chart)-->
<!--      this.chart.setOption({-->
<!--        grid: {-->
<!--          top: '12px'-->
<!--        },-->
<!--        color: ['#FFB761', '#FA694C', '#7AC850', '#50CEFE', '#50CEFE', '#727ACB'],-->
<!--        title: {-->
<!--          text: '业务类型分布',-->
<!--          left: 'center',-->
<!--          top: '12',-->
<!--          textStyle: {-->
<!--            color: '#8AABFB',-->
<!--            fontWeight: '500',-->
<!--            fontSize: '20px'-->
<!--          }-->
<!--        },-->
<!--        tooltip: {-->
<!--          trigger: 'item',-->
<!--          formatter: '{a} <br/>{b} : {c} ({d}%)'-->
<!--        },-->
<!--        legend: {-->
<!--          type: 'scroll',-->
<!--          orient: 'vertical',-->
<!--          right: '24',-->
<!--          top: '24',-->
<!--          bottom: '24',-->
<!--          data: ['生产', '综合', '财务', '人资', '市场'],-->
<!--          textStyle: {-->
<!--            color: '#fff',-->
<!--            fontSize: '14px'-->
<!--          }-->
<!--        },-->
<!--        series: [-->
<!--          {-->
<!--            name: '访问来源',-->
<!--            type: 'pie',-->
<!--            radius: '55%',-->
<!--            center: ['40%', '55%'],-->
<!--            data: [-->
<!--              { value: 335, name: '生产' },-->
<!--              { value: 310, name: '综合' },-->
<!--              { value: 234, name: '财务' },-->
<!--              { value: 135, name: '人资' },-->
<!--              { value: 1548, name: '市场' }-->
<!--            ],-->
<!--            emphasis: {-->
<!--              itemStyle: {-->
<!--                shadowBlur: 10,-->
<!--                shadowOffsetX: 0,-->
<!--                shadowColor: 'rgba(0, 0, 0, 0.5)'-->
<!--              }-->
<!--            }-->
<!--          }-->
<!--        ]-->
<!--      })-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped lang="less">-->
<!--.chart-pie {-->
<!--  width: 100%;-->
<!--  height: 238px;-->
<!--}-->
<!--</style>-->
