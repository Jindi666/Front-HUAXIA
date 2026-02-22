<template>
  <div id="thirdLeft">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-area" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">近期运行情况（近3个月）</span>
          <!-- <div class="decoration2">
            <dv-decoration-2 />
          </div> -->
        </div>
      </div>
      <div class="linebg">
        <Chart :cdata="flowCountList" :ename="'流程数量（按天统计）'" />
        <Chart :cdata="flowAddList" :ename="'新增流程（按周统计）'" />
        <!-- <Chart :cdata="taskCountList" :ename="'任务数量（按天统计）'" /> -->
        <Line4 :cdata="taskRateCountList" :isPercent="true" :ename="'任务成功率/数量（按天统计）'" />
      </div>
    </div>
  </div>
</template>

<script>
import Line4 from '@/components/echart/line4/chart'
import Chart from '@/components/echart/line2/chart'
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
      drawTiming: null,
      flowAddList: {
        weekCategory: [],
        weekLineData: []
      },
      flowCountList: {
        weekCategory: [],
        weekLineData: []
      },
      taskRateCountList: {
        weekCategory: [],
        taskCountList: [],
        taskRateList: []
      },
      showType: false
    }
  },
  components: {
    Chart,
    Line4
  },
  mounted() {
    const that = this
    this.getOperationCondition()
    this.interval = window.setInterval(function() {
      that.getOperationCondition()
    }, this.refreshInterval)
  },
  beforeDestroy() {
    window.clearInterval(this.interval)
  },
  methods: {
    getOperationCondition() {
      Api.getOperationCondition({}).then(response => {
        this.flowAddList = {
          weekCategory: [],
          weekLineData: []
        }
        this.flowCountList = {
          weekCategory: [],
          weekLineData: []
        }
        this.taskRateCountList = {
          weekCategory: [],
          taskCountList: [],
          taskRateList: []
        }
        const res = response.data
        if (response.code == 200) {
          res.flowAddList.forEach(item => {
            this.flowAddList.weekCategory.push(item.weekName)
            this.flowAddList.weekLineData.push(item.flowCount)
          })
          res.flowCountList.forEach(item => {
            this.flowCountList.weekCategory.push(item.queryDate)
            this.flowCountList.weekLineData.push(item.flowCount)
          })

          // for (var i = 0; i < 7; i++) {
          //   this.taskRateCountList.weekCategory.push(res.taskCountRateList[i].queryDate)
          //   this.taskRateCountList.taskRateList.push(res.taskCountRateList[i].taskRate)
          //   this.taskRateCountList.taskCountList.push(res.taskCountRateList[i].taskCount)
          // }
          res.taskCountRateList.forEach(item => {
            this.taskRateCountList.weekCategory.push(item.queryDate)
            this.taskRateCountList.taskRateList.push(item.taskRate)
            this.taskRateCountList.taskCountList.push(item.taskCount)
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" class>
#thirdLeft {
  padding: 14px 16px;
  height: 100%;
  width: 100%;
  border-radius: 5px;

  .linebg {
    background-color: #fff;
    .ech {
      margin-top: 3px;
    }
  }

  .bg-color-black {
    background-color: #fff;
    height: 100%;
    border-radius: 10px;
  }
  .text {
    color: #bf0008;
    font-size: 14px;
    margin-top: -3px;
  }
  //下滑线动态
  .decoration2 {
    position: absolute;
    right: 0.125rem;
  }
  .chart-box {
    margin-top: 16px;
    width: 170px;
    height: 170px;
    .active-ring-name {
      padding-top: 10px;
    }
  }
}
</style>
