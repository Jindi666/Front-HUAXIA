<template>
  <!-- <div id="chart" ref="chart" class="chart-pie"></div> -->
  <div class="chart-container">
    <!-- <div id="chart" ref="chart" :style="{ visibility: chartVisible }" class="chart-pie"></div> -->
    <div>
      <div style="display:flex" class="pie">
        <business-type style="flex:1" :typeId="type1" :num="interiorNum" :refresh-interval="refreshInterval" v-on:pieClick="showDetail" />
        <business-type style="flex:1" :typeId="type2" :num="provinceNum" :refresh-interval="refreshInterval" v-on:pieClick="showDetail" />
        <business-type style="flex:1" :typeId="type3" :num="externalNum" :refresh-interval="refreshInterval" v-on:pieClick="showDetail" />
      </div>
      <div class="color-block-container" :style="{ visibility: chartVisible }">
        <div v-for="(capsule, index) in chartColors.length" :key="index" class="color-block-item">
          <span class="color-block" :style="`background-image: linear-gradient(${chartColors[index]},${chartColors2[index]});`"></span>
          <span class="color-block-text">{{ typeConfig.length > 0 ? typeConfig[index].tool_name : '' }}</span>
        </div>
      </div>
    </div>
    <div class="empty-mask" :style="{ visibility: maskVisible }">
      <!-- <h2 class="title1">{{ $t('dashboard.digitalEmployeeDatav.text') }}</h2> -->
      <div class="empty-container">
        <a-empty :description="$t('public.noData.text')" image="@/assets/datav/default-chart2.png" />
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import line from 'echarts/lib/chart/line'
import { addListener, removeListener } from 'resize-detector'
import dashboardApi from '@/api/dashboard'
import dashboardApiDemo from '../mockApi/dashboardApi.js'
import { chartColors, chartColors2 } from '../components/chartColors'
import queryId from '@/store/queryId.js'
import BusinessType from './BusinessType'
import swiper from 'swiper'

export default {
  name: 'RingChart',
  components: { BusinessType },
  props: {
    refreshInterval: {
      type: Number,
      default: function() {
        return 30000
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
      type1: queryId.QUERYSCREENPIE_INTERIOR,
      type2: queryId.QUERYSCREENPIE_PROVINCE,
      type3: queryId.QUERYSCREENPIE_EXTERNAL,
      chart: null,
      intervalObj: null,
      firstLoad: true,
      chartVisible: 'hidden',
      maskVisible: 'visible',
      chartColors: chartColors,
      chartColors2: chartColors2,
      typeConfig: [],
      digitalEmployeesNum: [],
      interiorNum: 0,
      provinceNum: 0,
      externalNum: 0,
      intervalRefresh: null
    }
  },
  mounted() {
    this.loadColors()
    this.loadData()
    const that = this
    this.intervalRefresh = window.setInterval(function() {
      that.loadData()
    }, this.refreshInterval)
  },
  watch: {
    refreshInterval: function(val) {
      window.clearInterval(this.intervalRefresh)
      const that = this
      this.intervalRefresh = window.setInterval(function() {
        that.loadData()
      }, this.refreshInterval)
    }
  },
  beforeDestroy() {
    window.clearInterval(this.intervalRefresh)
  },
  methods: {
    showDetail(typeId) {
      // console.log('showDetail')
      this.$emit('show', typeId)
    },
    getApi() {
      if (this.demoMode) {
        return dashboardApiDemo
      } else {
        return dashboardApi
      }
    },
    loadColors() {
      this.getApi()
        .queries(queryId.V_TOOLNAME)
        .then(resp => {
          this.chartVisible = 'visible'
          this.maskVisible = 'hidden'
          const data = resp?.data?.query_result?.data.rows
          data.push({
            tool_name: '其它工具'
          })
          // console.log(data)
          this.typeConfig = data
        })
    },
    loadData() {
      let that = this
      this.getApi()
        .queries(queryId.QUERYSTAFFNAMEBYAREANAME)
        .then(response => {
          let nums = response?.data?.query_result?.data.rows
          //      interiorNum: 0,
          // provinceNum: 0,
          // externalNum: 0
          nums.forEach(element => {
            switch (element.areaName) {
              case '内部生产运营':
                that.interiorNum = element.areaNameCount
                break
              case '省专业务协同':
                that.provinceNum = element.areaNameCount
                break
              case '外部行业拓展':
                that.externalNum = element.areaNameCount
                break
              default:
                break
            }
          })
        })
    }
  }
}
</script>

<style scoped lang="less">
.pie {
  position: relative;
  top: 40px;
  @media screen and (min-width: 3000px) {
    position: relative;
    top: 50px;
  }
}
.color-block-container {
  position: relative;
  top: 60px;
  display: flex;
  left: 5%;
  width: 90%;
  text-align: left;
  flex-wrap: wrap;
  @media screen and (min-width: 3000px) {
    // width: 200px;
    top: 90px;
  }
}
.color-block-text {
  color: aliceblue;
  height: 22px;
  width: 80px;
  line-height: 22px;
  font-size: 13px;
  @media screen and (min-width: 3000px) {
    font-size: 26px;
    height: 44px;
    width: 140px;
    line-height: 44px;
  }
}
.color-block {
  height: 16px;
  width: 24px;
  margin: auto;
  margin-right: 2px;
  border-radius: 5px;
  @media screen and (min-width: 3000px) {
    height: 32px;
    width: 56px;
    margin-right: 12px;
    border-radius: 10px;
  }
}
.color-block-item {
  margin-right: 2%;
  width: auto;
  display: flex;
  line-height: 24px;
  height: 24px;
  font-size: 12px;
  @media screen and (min-width: 3000px) {
    line-height: 48px;
    height: 48px;
    font-size: 24px;
  }
}
/deep/ .ant-empty-image {
  @media screen and (min-width: 3000px) {
    height: 200px;
  }
}
.chart-container {
  position: relative;
  height: 320px;
  // border-top: 1px solid #546fb0;
  @media screen and (min-width: 3000px) {
    height: 640px;
  }
}
// .chart-pie {
//   width: 100%;
// }
.empty-mask {
  // text-align: center;
  // padding-top: 70px;
  position: absolute;
  width: 100%;
  top: 0px;
  left: 0px;
  top: 0px;
  bottom: 0px;
  color: white;

  .empty-container {
    padding-top: 90px;
    // @media screen and (min-width: 3000px) {
    //   padding-top: 140px;
    // }
    @media screen and (min-width: 3000px) {
      padding-top: 180px;
    }
  }

  h2.title1 {
    color: #8aaafc;
    font-size: 18px;
    font-weight: bold;
    position: absolute;
    left: 9px;
    top: 11px;
    text-align: left;
    width: 100%;
    @media screen and (min-width: 3000px) {
      font-size: 36px;
      left: 18px;
      top: 22px;
    }
  }
}

.empty-mask /deep/ .ant-empty-description {
  color: rgba(132, 172, 255, 1);
  font-size: 24px;
  @media screen and (min-width: 3000px) {
    margin-top: 20px;
    font-size: 48px;
  }
}

// .chart-pie {
//   position: absolute;
//   width: 100%;
//   height: 260px;
//   @media screen and (min-width: 3000px) {
//     height: 520px;
//   }
// }
.chart-pie {
  position: absolute;
  width: 100%;
  height: 280px;
  padding: 0px 10px;
  @media screen and (min-width: 3000px) {
    height: 560px;
    padding: 0px 20px;
  }
}
.option-box {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  text-align: right;

  strong {
    font-size: 16px;
    font-weight: 600;
    margin-left: 1em;
    @media screen and (min-width: 3000px) {
      font-size: 32px;
    }
  }
}
</style>
