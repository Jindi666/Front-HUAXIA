<template>
  <div id="centerRight1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 ">
        <span>
          <icon name="chart-line" class="text-icon icon"></icon>
        </span>
        <div class="d-flex" style="width:100%">
          <div class="fs-xl text">任务失败次数Top5统计</div>
          <!-- <div class="detail">详细列表 ></div> -->
        </div>
      </div>
      <div class="d-flex jc-center body-box">
        <dv-scroll-board class="dv-scr-board" :config="config" :color="decorationColor" />
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/api/monitor.js'
export default {
  props: {
    refreshInterval: {
      type: Number,
      default: function() {
        return 60000
      }
    }
  },
  data() {
    return {
      interval: null,
      decorationColor: ['#E5999C', '#FFECE8'],
      config: {}
    }
  },
  mounted() {
    this.getTop5Data()
    this.interval = window.setInterval(() => {
      this.getTop5Data()
    }, this.refreshInterval)
  },
  beforeDestroy() {
    window.clearInterval(this.interval)
  },
  methods: {
    getTop5Data() {
      Api.getTaskFailureTop5({}).then(response => {
        if (response.code == 200) {
          const tableOptions = this.getScrollTableOptions()
          response.data.forEach(item => {
            tableOptions.data.push([item.deptName, item.flowName, item.failureCount, item.lastFailureTime])
          })
          this.config = tableOptions
        }
      })
    },
    getScrollTableOptions() {
      return {
        header: ['部门', '流程', '失败次数', '失败发生时间'],
        waitTime: 2000,
        hoverPause: false,
        data: [],
        rowNum: 5,
        headerHeight: 30,
        headerBGC: 'transparent',
        oddRowBGC: '#FCF2F3',
        evenRowBGC: '#F7E0E1',
        carousel: 'page',
        align: ['left', 'left', 'left', 'left']
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#centerRight1 {
  padding: 4px 16px;
  padding-top: 6px;
  height: 100%;
  width: 100%;
  border-radius: 5px;

  .icon {
    padding: 1px;
    margin-top: 3px;
  }

  .dv-scroll-board {
    color: #000;
  }

  ::v-deep .dv-scroll-board {
    .header {
      color: #fff !important;
      font-size: 14px !important;

      .header-item {
        background-color: #b71d25;
      }
    }
    .rows .row-item {
      margin-bottom: 5px !important;
      height: 40px !important;
      line-height: 40px !important;
    }
  }

  .bg-color-black {
    height: 98%;
    border-radius: 5px;
  }
  .text {
    color: #b71d25;
    padding-left: 5px;
    padding-bottom: 4px;
    font-weight: 400;
    font-size: 14px;
    flex: 1;
  }

  .detail {
    color: #3d475c !important;
    font-size: 14px;
    padding-top: 1px;
    padding-right: 15px;
  }

  .body-box {
    border-radius: 10px;
    overflow: hidden;
    margin-top: 5px;
    .dv-scr-board {
      width: 578px;
      height: 255px;
    }
  }
}
</style>
