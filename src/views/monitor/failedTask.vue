<template>
  <div id="centerRight1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 ">
        <!-- <span>
          <icon name="chart-line" class="text-icon"></icon>
        </span> -->
        <div class="d-flex" style="width:100%">
          <div class="fs-xl text">{{ '今日失败任务数:' + num + '个,到目前为止任务失败率:' + percent + '%' }}</div>
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
import { forEach } from 'lodash'
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
    document.title = '华夏基金可视化看板'
    const that = this
    this.getFailureRate()
    this.interval = window.setInterval(function() {
      that.getFailureRate()
    }, this.refreshInterval)
  },
  beforeDestroy() {
    window.clearInterval(this.interval)
  },
  methods: {
    getFailureRate() {
      Api.getFailureRate({}).then(response => {
        this.config.data = []
        if (response.code == 200) {
          this.num = response.data.todayTaskFailNumber
          this.percent = response.data.taskFailRate
          const tableOptions = this.getScrollTableOptions()
          response.data.failTaskList.forEach(failure => {
            tableOptions.data.push([failure.queryDate, failure.deptName, failure.workerName, failure.flowName, failure.content])
          })
          this.config = tableOptions
        }
      })
    },
    getScrollTableOptions() {
      return {
        header: ['报错时间', '部门', '机器人', '流程', '报错信息'],
        waitTime: 1000,
        data: [],
        rowNum: 3, //表格行数
        headerHeight: 30,
        headerBGC: 'transparent', //表头
        oddRowBGC: '#FCF2F3', //奇数行
        evenRowBGC: '#F7E0E1', //偶数行
        // index: true,
        columnWidth: [100, 120, 160, 160, 890],
        align: ['left', 'left', 'left', 'left', 'left']
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$box-height: 143px;
$box-width: 1460px;
#centerRight1 {
  padding: 4px 16px;
  padding-top: 10px;
  height: $box-height;
  width: $box-width;
  border-radius: 5px;

  .dv-scroll-board {
    color: #000;
    margin-top: 5px;
  }

  ::v-deep .dv-scroll-board {
    .header {
      color: #fff !important;
      font-size: 14px !important;
      margin-bottom: 5px !important;

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
    height: $box-height;
    border-radius: 5px;
  }
  .text {
    color: #171d29;
    padding-bottom: 4px;
    font-weight: 600;
    font-size: 16px;
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
    // margin-top: 5px;
    .dv-scr-board {
      width: $box-width - 10px;
      height: $box-height - 20px;
    }
  }
}
</style>
