<template>
  <div class="scroll-table-detail">
    <!-- <dv-scroll-board :config="scrollTable" class="scroll-board" /> -->
    <div class="chart-container-detail">
      <dv-scroll-board :config="scrollTable" class="scroll-board-detail" :style="{ visibility: chartVisible }" />
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
  name: 'UserRunDetail',
  props: {
    type: {
      type: Number,
      default: function() {
        return 1
      }
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
      intervalTest: null,
      demoMode: false,
      scrollTable: {},
      header: ['员工姓名', '部门名称', '业务场景', '开始时间', '结束时间', '节省工时', '业务量', '状态'],
      chartVisible: 'hidden',
      maskVisible: 'visible'
    }
  },
  mounted() {
    this.loadData()
    const that = this
    this.intervalTest = window.setInterval(function() {
      that.loadData()
    }, this.refreshInterval)
  },
  watch: {
    type: function(val) {
      this.loadData()
    },
    refreshInterval: function(val) {
      window.clearInterval(this.intervalTest)
      const that = this
      this.intervalTest = window.setInterval(function() {
        that.loadData()
      }, this.refreshInterval)
    }
  },
  beforeDestroy() {
    window.clearInterval(this.intervalTest)
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
      let id = queryId.QUERYSCREENTODAYRUNINFO
      if (this.type == 1) {
        id = queryId.QUERYSCREENTODAYRUNINFO
      } else if (this.type == 2) {
        id = queryId.QUERYSCREENTODAYRUNINGINFO
      } else if (this.type == 3) {
        id = queryId.QUERYSCREENTODAYDEPLOYINGINFO
      } else if (this.type == 4) {
        id = queryId.QUERYSCREENTODAYWORKINFO
      } else if (this.type == 5) {
        id = queryId.RUNNINGDYNAMIC_CLICK
      }
      this.getApi()
        .queries(id)
        .then(response => {
          if (response?.data?.query_result?.data) {
            const data = response?.data?.query_result?.data.rows

            const tableOptions = this.getScrollTableOptions()
            for (const item of data) {
              item.result = '<span class="text-success">' + item.taskResult + '</span>'
              const d = [item.staffName, item.departName, item.senceName, item.startTime, item.stopTime, item.workhoursDescription, item.businessVolume, item.result]
              tableOptions.data.push(d)
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
          header: this.header,
          headerHeight: 70,
          lineHeight: 70,
          rowNum: 20,
          fontSize: '80',
          data: [],
          align: ['center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center'],
          waitTime: 5000,
          columnWidth: [200, 400, 1000, 800, 800, 800, 600, 400, 300],
          headerBGC: '#1981f7',
          oddRowBGC: '#002446',
          evenRowBGC: '#09192d',
          index: true,
          indexHeader: '序号',
          carousel: 'page',
          hoverPause: false
        }
      } else {
        return {
          header: this.header,
          headerHeight: 35,
          lineHeight: 35,
          rowNum: 20,
          waitTime: 5000,
          data: [],
          fontSize: '40',
          align: ['center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center'],
          columnWidth: [100, 200, 500, 400, 400, 400, 300, 200, 150],
          headerBGC: '#1981f7',
          oddRowBGC: '#002446',
          evenRowBGC: '#09192d',
          index: true,
          indexHeader: '序号',
          carousel: 'page',
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
.scroll-table-detail {
  // margin-top: 1.8%;

  .row-item {
    height: 50px;
    @media screen and (min-width: 3000px) {
      height: 110px;
    }
  }

  .scroll-board-detail {
    width: 100%;
    height: 835px;
    // margin-top: 20px;
    @media screen and (min-width: 3000px) {
      height: 1670px;
    }
  }

  .chart-container-detail {
    position: relative;
    // height: 260px;
    // border-top: 1px solid #546fb0;
    @media screen and (min-width: 3000px) {
      // height: 520px;
    }
  }
  .empty-mask {
    position: absolute;
    width: 100%;
    left: 0px;
    top: 100px;
    bottom: 0px;
    color: white;

    .empty-container {
      padding-top: 70px;
      @media screen and (min-width: 3000px) {
        padding-top: 140px;
      }
    }
  }

  .chart-container-detail /deep/ .ant-empty-description {
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
  height: 35px !important;
  line-height: 35px !important;
  font-size: 20px !important;
  // margin-top: 50px;
  // padding-left: 10px !important;
  @media screen and (min-width: 3000px) {
    // padding-top: 10px;
    // padding-left: 60px;
    height: 70px !important;
    line-height: 70px !important;
    font-size: 40px !important;
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
  height: 40px !important;
  line-height: 40px !important;
  @media screen and (min-width: 3000px) {
    height: 80px !important;
    line-height: 80px !important;
  }
}

/deep/.dv-scroll-board .rows .ceil {
  font-size: 16px !important;
  @media screen and (min-width: 3000px) {
    font-size: 32px !important;
  }
}
</style>
