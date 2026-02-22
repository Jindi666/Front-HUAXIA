<template>
  <div class="scroll-table-running">
    <!-- <dv-border-box-10 class="border-box"> -->
    <!-- <dv-scroll-board :config="scrollTable" class="scroll-board" /> -->
    <!-- </dv-border-box-10> -->
    <div class="chart-container-running">
      <dv-scroll-board :config="scrollTable" class="scroll-board-running" :style="{ visibility: chartVisible }" />
      <!-- <div id="chart" ref="chart" :style="{ visibility: chartVisible }" class="chart-pie"></div> -->
      <div class="empty-mask" :style="{ visibility: maskVisible }">
        <div class="empty-container">
          <a-empty :description="$t('public.noData.text')" image="@/assets/datav/default-chart2.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dashboardApi from '@/api/dashboard'
import dashboardApiDemo from '../mockApi/dashboardApi.js'
import queryId from '@/store/queryId.js'

export default {
  name: 'UserRunning',
  props: {
    typeId: {
      type: String,
      default: ''
    },
    refreshInterval: {
      type: Number,
      default: function() {
        return 30000
      }
    }
  },
  data() {
    return {
      intervalRefresh: null,
      demoMode: false,
      scrollTable: {},
      header: ['员工姓名', '部门名称', '业务场景', '数字员工入职时间', '业务量(近30天)', '节省工时(近30天)', '工具类型'],
      chartVisible: 'hidden',
      maskVisible: 'visible'
    }
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
  mounted() {
    this.loadData()
    const that = this
    this.intervalRefresh = window.setInterval(function() {
      that.loadData()
    }, this.refreshInterval)
  },
  beforeDestroy() {
    window.clearInterval(this.intervalRefresh)
  },
  methods: {
    getApi() {
      // return dashboardApiDemo
      if (this.demoMode) {
        return dashboardApiDemo
      } else {
        return dashboardApi
      }
    },
    loadData() {
      this.getApi()
        .queries(queryId.QUERYSCREENRUNINGINFO)
        .then(response => {
          // console.log(response)
          const rows = response.data.query_result.data.rows
          if (rows) {
            const tableOptions = this.getScrollTableOptions()
            for (const item of rows) {
              item.result = '<span class="text-success">' + item.state + '</span>'
              const d = [item.startTime, item.departName, item.staffName, item.result]
              tableOptions.data.push(d)
            }

            for (let i = rows.length; i < 4; i++) {
              tableOptions.data.push(['-', '-', '-', '-'])
            }

            this.scrollTable = tableOptions
            this.chartVisible = 'visible'
            this.maskVisible = 'hidden'
          } else {
            this.chartVisible = 'hidden'
            this.maskVisible = 'visible'
            this.$message.error(response.message)
          }
        })
    },
    getScrollTableOptions() {
      let height = screen.availHeight
      if (height > 2000) {
        return {
          //this.$t('datav.workerRunState.text')
          header: ['时间', '部门名称', '员工姓名', '状态'],
          headerHeight: 80,
          lineHeight: 80,
          rowNum: 4,
          fontSize: '40',
          data: [],
          align: ['center', 'center', 'center', 'center'],
          waitTime: 2000,
          columnWidth: [200, 600, 300, 200],
          headerBGC: '#081E45',
          oddRowBGC: '#00000000',
          evenRowBGC: '#00000000',
          hoverPause: false
        }
      } else {
        return {
          header: ['时间', '部门名称', '员工姓名', '状态'],
          headerHeight: 40,
          lineHeight: 40,
          rowNum: 4,
          waitTime: 2000,
          data: [],
          fontSize: '20',
          align: ['center', 'center', 'center', 'center'],
          columnWidth: [200, 600, 300, 200],
          headerBGC: '#081E45',
          oddRowBGC: '#00000000',
          evenRowBGC: '#00000000',
          hoverPause: false
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
// /deep/ .dv-scroll-board .rows {
//   padding-left: 0px !important;
//   margin-top: 0px !important;
//   @media screen and (min-width: 3000px) {
//     padding-left: 0px !important;
//     margin-top: 0px !important;
//   }
// }
.scroll-table-running {
  height: 280px;
  @media screen and (min-width: 3000px) {
    height: 560px;
  }

  .row-item {
    height: 40px;
    @media screen and (min-width: 3000px) {
      height: 80px;
    }
  }

  .scroll-board-running {
    width: 100%;
    height: 220px;
    // margin-top: 20px;
    @media screen and (min-width: 3000px) {
      height: 440px;
    }
  }

  .chart-container-running {
    position: relative;
    // margin-top: 13px;
    padding: 0 3%;
    padding-top: 8%;
    height: 200px;
    // border-top: 1px solid #546fb0;
    @media screen and (min-width: 3000px) {
      // margin-top: 26px;
      padding-top: 6%;
      height: 400px;
    }
  }
  .empty-mask {
    // text-align: center;
    // padding-top: 70px;
    position: absolute;
    width: 100%;
    left: 0px;
    top: 0px;
    bottom: 0px;
    color: white;

    .empty-container {
      padding-top: 70px;
      @media screen and (min-width: 3000px) {
        padding-top: 140px;
      }
    }
  }

  .chart-container-running /deep/ .ant-empty-description {
    color: rgba(132, 172, 255, 1);
    font-size: 24px;
    @media screen and (min-width: 3000px) {
      margin-top: 20px;
      font-size: 48px;
    }
  }

  /deep/ .ant-empty-image {
    @media screen and (min-width: 3000px) {
      height: 200px;
    }
  }
}

/deep/.dv-scroll-board .header {
  // padding-top: 8px;
  // padding-left: 30px;
  height: 40px !important;
  line-height: 40px !important;
  font-size: 17px !important;
  // margin-top: 50px;
  // padding-left: 10px !important;
  @media screen and (min-width: 3000px) {
    // padding-top: 10px;
    // padding-left: 60px;
    height: 80px !important;
    line-height: 80px !important;
    font-size: 34px !important;
    // margin-top: 50px;
    // padding-left: 20px !important;
  }
}

/deep/.dv-scroll-board .rows {
  // padding-left: 30px;
  // margin-top: -10px;
  // height: 160px !important;
  @media screen and (min-width: 3000px) {
    // margin-top: -20px;
    // padding-left: 60px;
    font-size: 40px;
    // height: 360px !important;
  }
}

/deep/.dv-scroll-board .row-item {
  height: 45px !important;
  line-height: 45px !important;
  @media screen and (min-width: 3000px) {
    height: 90px !important;
    line-height: 90px !important;
  }
}

/deep/.dv-scroll-board .rows .ceil {
  font-size: 16px !important;
  @media screen and (min-width: 3000px) {
    font-size: 32px !important;
  }
}
</style>
