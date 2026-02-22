<template>
  <div class="scroll-table-total">
    <!-- <dv-border-box-10 class="border-box"> -->
    <!-- <dv-scroll-board :config="scrollTable" class="scroll-board" /> -->
    <!-- </dv-border-box-10> -->
    <div class="chart-container-total">
      <dv-scroll-board :config="scrollTable" ref="dvScroll" class="scroll-board-total" :style="{ visibility: chartVisible }" />
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
  name: 'UserTotal',
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
      intervalTest: null,
      demoMode: false,
      scrollTable: {},
      header: ['员工姓名', '部门名称', '业务场景', '岗位职责', '业务量', '节省工时', '业务效果', '数智化能力'],
      chartVisible: 'hidden',
      maskVisible: 'visible'
    }
  },
  watch: {
    typeId: function(val) {
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
  mounted() {
    this.loadData()
    const that = this
    this.intervalTest = window.setInterval(function() {
      that.loadData()
    }, this.refreshInterval)
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
      this.getApi()
        .queries(this.typeId)
        .then(response => {
          console.log(response)
          const rows = response.data.query_result.data.rows
          if (rows) {
            const tableOptions = this.getScrollTableOptions()
            for (const item of rows) {
              const d = [item.staffName, item.departName, item.senceName, item.jobDescription, item.businessVolume, item.workHours + '小时', item.businessEffect, item.toolName]
              tableOptions.data.push(d)
            }

            this.chartVisible = 'visible'
            this.maskVisible = 'hidden'
            this.scrollTable = tableOptions
            // this.$refs.dvScroll.$forceUpdate()
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
          align: ['center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center'],
          waitTime: 5000,
          columnWidth: [200, 400, 1000, 500, 900, 250, 300, 800, 600],
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
          align: ['center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center'],
          columnWidth: [200, 400, 1000, 500, 900, 250, 300, 800, 600],
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
.scroll-table-total {
  .row-item {
    height: 50px;
    @media screen and (min-width: 3000px) {
      height: 110px;
    }
  }

  .scroll-board-total {
    width: 100%;
    height: 835px;
    // margin-top: 20px;
    @media screen and (min-width: 3000px) {
      height: 1670px;
    }
  }

  .chart-container-total {
    position: relative;
    height: 260px;
    // border-top: 1px solid #546fb0;
    @media screen and (min-width: 3000px) {
      height: 520px;
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

  .chart-container-total /deep/ .ant-empty-description {
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
