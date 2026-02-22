<template>
  <div id="taskRunStatistics">
    <div class="bg-color-black">
      <div class="d-flex pt-2 ">
        <span>
          <icon name="chart-line" class="text-icon icon"></icon>
        </span>
        <div class="d-flex" style="width:100%">
          <div class="fs-xl text">任务运行统计</div>
          <div class="detail" @click="$emit('detailClick')">详细列表 ></div>
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
      num: '',
      percent: '',
      decorationColor: ['#E5999C', '#FFECE8'],
      config: {}
    }
  },
  mounted() {
    const that = this
    this.getTaskRunStatistics()
    this.interval = window.setInterval(function() {
      that.getTaskRunStatistics()
    }, this.refreshInterval)
  },
  beforeDestroy() {
    window.clearInterval(this.interval)
  },
  methods: {
    getTaskRunStatistics() {
      Api.getTaskRunStatistics({}).then(response => {
        this.config.data = []
        if (response.code == 200) {
          const tableOptions = this.getScrollTableOptions()
          response.data.forEach(item => {
            tableOptions.data.push([item.deptName, item.taskSuccess, item.taskFail, item.taskRunning, item.taskDeploying])
          })
          this.config = tableOptions
        }
      })
    },
    getScrollTableOptions() {
      return {
        header: ['部门', '成功', '失败', '运行中', '待运行'],
        waitTime: 1000,
        data: [],
        rowNum: 4, //表格行数
        headerHeight: 30,
        headerBGC: 'transparent', //表头
        oddRowBGC: '#FCF2F3', //奇数行
        evenRowBGC: '#F7E0E1', //偶数行
        // index: true,
        columnWidth: [180, 80, 80, 70, 70],
        align: ['left', 'left', 'left', 'left', 'left']
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#taskRunStatistics {
  padding: 0px 6px;
  margin-top: -2px;
  height: 100%;
  width: 100%;
  border-radius: 5px;

  .icon {
    padding: 1px;
    margin-top: 3px;
  }

  .dv-scroll-board {
    color: #000;
    margin-top: 5px;
  }

  ::v-deep .dv-scroll-board {
    .header {
      color: #fff !important;
      font-size: 14px !important;
      margin-bottom: 4px !important;

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
    .dv-scr-board {
      width: 505px;
      height: 210px;
    }
  }
}
</style>
