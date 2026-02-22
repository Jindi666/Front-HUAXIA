<template>
  <div class="card">
    <div class="title">
      正在运行
    </div>
    <div class="content">
      <dv-scroll-board :config="scrollTable" class="scroll-board-running" />
    </div>
  </div>
  <!-- <div class="scroll-table-running">
    <div class="chart-container-running">

      <dv-scroll-board :config="scrollTable" class="scroll-board-running" :style="{ visibility: chartVisible }" />
      <div class="empty-mask" :style="{ visibility: maskVisible }">
        <div class="empty-container">
          <a-empty :description="$t('public.noData.text')" image="/img/datav/default-chart2.png" />
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
import dashboardApiDemo from '../../mockApi/dashboardApi.js'
import queryId from '@/store/queryId.js'
import Api from '@/api/datav.js'

export default {
  name: 'running',
  props: {
    typeId: {
      type: String,
      default: ''
    },
    refreshInterval: {
      type: Number,
      default: function() {
        return 60000
      }
    }
  },
  data() {
    return {
      intervalRefresh: null,
      demoMode: false,
      scrollTable: {},
      header: ['流程名称', '所属中心', '所属部门', '入职时间']
    }
  },
  // watch: {
  //   refreshInterval: function(val) {
  //     window.clearInterval(this.intervalRefresh)
  //     const that = this
  //     this.intervalRefresh = window.setInterval(function() {
  //       that.loadData()
  //     }, this.refreshInterval)
  //   }
  // },
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
      return dashboardApiDemo
      // if (this.demoMode) {
      //   return dashboardApiDemo
      // } else {
      //   return dashboardApi
      // }
    },
    loadData() {
      this.getTaskRunningInfo()
    },
    getTaskRunningInfo() {
      Api.getTaskRunningInfo({}).then(response => {
        // console.log(response.data)
        const rows = response.data
        // if (rows) {
        const tableOptions = this.getScrollTableOptions()
        for (const item of rows) {
          const d = [item.flow_name, item.dept_name_L1, item.dept_name_L2, item.create_time]
          tableOptions.data.push(d)
        }

        // for (let i = rows.length; i < 6; i++) {
        //   tableOptions.data.push(['-', '-', '-', '-'])
        // }
        console.log(tableOptions.data)
        this.scrollTable = tableOptions
      })
    },
    getScrollTableOptions() {
      let width = document.body.clientWidth
      let that = this
      if (width > 3000) {
        return {
          header: ['流程名称', '所属中心', '所属部门', '入职时间'],
          headerHeight: 80,
          lineHeight: 80,
          rowNum: 7,
          waitTime: 4000,
          data: [],
          fontSize: '20',
          align: ['left', 'center', 'center', 'center'],
          columnWidth: [600, 200, 300, 300],
          headerBGC: '#fff',
          oddRowBGC: '#00000000',
          evenRowBGC: '#F7F8FA',
          hoverPause: false,
          carousel: 'page'
        }
      } else {
        return {
          header: ['流程名称', '所属中心', '所属部门', '入职时间'],
          headerHeight: 40,
          lineHeight: 40,
          rowNum: 7,
          waitTime: 4000,
          data: [],
          fontSize: '20',
          align: ['left', 'center', 'center', 'center'],
          columnWidth: [300, 100, 150, 150],
          headerBGC: '#fff',
          oddRowBGC: '#00000000',
          evenRowBGC: '#F7F8FA',
          hoverPause: false,
          carousel: 'page'
        }
      }
    }
  },
  computed: {
    departmentId() {
      return this.$store.state.dataVUser.select_department_id
    }
  },
  watch: {
    departmentId: function(newVal, oldVal) {
      this.getTaskRunningInfo()
    }
  }
}
</script>

<style scoped lang="less">
.card {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background: #fff;

  .title {
    width: 100%;
    height: 20px;
    text-align: left;
    color: #171d29;
    font-size: 16px;
    font-weight: 700;
    padding: 16px 32px 16px 19px;
    margin-bottom: 16px;
  }
  .content {
    text-align: left;
    // padding-left: 6px;
    margin: 0px 20px;

    .scroll-board-running {
      z-index: 100;
      width: 100%;
      // padding: 0px 10px;
      height: 270px;
      // // margin-top: 20px;
      // @media screen and (min-width: 3000px) {
      //   height: 440px;
      // }
    }
  }
}
// /deep/ .dv-scroll-board .rows {
//   padding-left: 0px !important;
//   margin-top: 0px !important;
//   @media screen and (min-width: 3000px) {
//     padding-left: 0px !important;
//     margin-top: 0px !important;
//   }
// }
// .scroll-table-running {
//   width: 100%;
//   height: 100%;
//   border-radius: 8px;
//   background: #fff;

//   .row-item {
//     height: 40px;
//     @media screen and (min-width: 3000px) {
//       height: 80px;
//     }
//   }

//   .chart-container-running {
//     position: relative;
//     // margin-top: 13px;
//     padding: 0 3%;
//     padding-top: 8%;
//     height: 200px;
//     // border-top: 1px solid #546fb0;
//     @media screen and (min-width: 3000px) {
//       // margin-top: 26px;
//       padding-top: 6%;
//       height: 400px;
//     }
//   }
//   .empty-mask {
//     // text-align: center;
//     // padding-top: 70px;
//     position: absolute;
//     width: 100%;
//     left: 0px;
//     top: 0px;
//     bottom: 0px;
//     color: white;

//     .empty-container {
//       padding-top: 70px;
//       @media screen and (min-width: 3000px) {
//         padding-top: 140px;
//       }
//     }
//   }

//   .chart-container-running /deep/ .ant-empty-description {
//     color: rgba(132, 172, 255, 1);
//     font-size: 24px;
//     @media screen and (min-width: 3000px) {
//       margin-top: 20px;
//       font-size: 48px;
//     }
//   }

//   /deep/ .ant-empty-image {
//     @media screen and (min-width: 3000px) {
//       height: 200px;
//     }
//   }
// }

// /deep/.dv-scroll-board .header {
//   // padding-top: 8px;
//   // padding-left: 30px;
//   height: 40px !important;
//   line-height: 40px !important;
//   font-size: 17px !important;
//   // margin-top: 50px;
//   // padding-left: 10px !important;
//   @media screen and (min-width: 3000px) {
//     // padding-top: 10px;
//     // padding-left: 60px;
//     height: 80px !important;
//     line-height: 80px !important;
//     font-size: 34px !important;
//     // margin-top: 50px;
//     // padding-left: 20px !important;
//   }
// }

// /deep/.dv-scroll-board .rows {
//   // padding-left: 30px;
//   // margin-top: -10px;
//   // height: 160px !important;
//   @media screen and (min-width: 3000px) {
//     // margin-top: -20px;
//     // padding-left: 60px;
//     font-size: 40px;
//     // height: 360px !important;
//   }
// }

/deep/.dv-scroll-board .row-item {
  height: 32px !important;
  line-height: 32px !important;

  // @media screen and (min-width: 3000px) {
  //   // height: 90px !important;
  //   // line-height: 90px !important;
  // }
}

/deep/.dv-scroll-board .header .header-item {
  font-size: 12px !important;
  color: #6d788f;
}

/deep/.dv-scroll-board .rows .ceil {
  font-size: 14px !important;
  color: #171d29;
  // @media screen and (min-width: 3000px) {
  //   // font-size: 32px !important;
  // }
}
</style>
