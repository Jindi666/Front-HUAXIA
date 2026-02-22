<template>
  <div id="centerRight1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-line" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">任务完成排行榜</span>
        </div>
      </div>
      <div class="d-flex jc-center body-box">
        <dv-scroll-board class="dv-scr-board" :config="config" :color="decorationColor" />
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/api/datav.js'
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
    const that = this
    this.getTaskFinishDepartment()
    this.interval = window.setInterval(function() {
      that.getTaskFinishDepartment()
    }, this.refreshInterval)
  },
  beforeDestroy() {
    window.clearInterval(this.interval)
  },
  methods: {
    getTaskFinishDepartment() {
      Api.getTaskFinishDepartment({}).then(response => {
        this.config.data = []
        if (response.code == 200) {
          const tableOptions = this.getScrollTableOptions()
          response.data.forEach(item => {
            tableOptions.data.push([item.deptName, item.workerNum, item.userNum, item.taskNum, item.flowNum, item.workHour])
          })
          this.config = tableOptions
        }
      })
    },
    getScrollTableOptions() {
      return {
        header: ['部门名称', '机器人', '用户', '任务', '流程', '节约工时'],
        waitTime: 1000,
        data: [],
        rowNum: 7, //表格行数
        headerHeight: 35,
        headerBGC: 'transparent', //表头
        oddRowBGC: '#FCF2F3', //奇数行
        evenRowBGC: '#F7E0E1', //偶数行
        // index: true,
        columnWidth: [230, 70, 60, 80, 60, 100],
        align: ['left', 'left', 'left', 'left', 'left', 'left']
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$box-height: 410px;
$box-width: 630px;
#centerRight1 {
  padding: 16px;
  padding-top: 15px;
  height: $box-height;
  width: $box-width;
  border-radius: 5px;

  .dv-scroll-board {
    color: #000;
  }

  ::v-deep .dv-scroll-board {
    .header {
      color: #fff !important;

      .header-item {
        background-color: #b71d25;
      }
    }
  }

  .bg-color-black {
    height: $box-height - 30px;
    border-radius: 10px;
  }
  .text {
    color: #bf0008;
  }
  .body-box {
    border-radius: 5px;
    margin-top: 10px;
    overflow: hidden;
    .dv-scr-board {
      width: 600px;
      height: 340px;
    }
  }
}
</style>
