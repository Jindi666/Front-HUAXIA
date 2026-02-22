<template>
  <div id="bottomRight">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-area" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">运行次数</span>
          <div class="decoration2">
            <!-- <dv-decoration-2 :reverse="true" style="width: 5px; height: 6rem" /> -->
          </div>
        </div>
      </div>
      <div>
        <Chart :cdata="config" />
      </div>
    </div>
  </div>
</template>

<script>
import Chart from '@/components/echart/line/chart'
import Api from '@/api/datav.js'
export default {
  components: {
    Chart
  },
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
      config: {
        weekCategory: [],
        radarData: [[]],
        weekMaxData: [],
        weekLineData: []
      }
    }
  },
  mounted() {
    const that = this
    this.getTaskSuccRate()
    this.interval = window.setInterval(function() {
      that.getTaskSuccRate()
    }, this.refreshInterval)
  },
  beforeDestroy() {
    window.clearInterval(this.interval)
  },
  methods: {
    getTaskSuccRate() {
      Api.getTaskSuccRate({}).then(response => {
        if (response.code == 200) {
          let res = response.data
          const tableOptions = this.getScrollTableOptions()
          // tableOptions.radarData = [res.workerCount, res.userCount, res.flowCount, res.taskCount]
          res.forEach(item => {
            tableOptions.weekCategory.push(item.queryDate)
            tableOptions.weekLineData.push(item.taskCount)
            tableOptions.weekMaxData.push(item.taskCount + 20)
          })
          this.config = tableOptions
        }
      })
    },
    getScrollTableOptions() {
      return {
        weekCategory: [],
        radarData: [],
        weekMaxData: [],
        weekLineData: []
      }
    }
  }
}
</script>

<style lang="scss" class>
$box-height: 330px;
$box-width: 100%;
#bottomRight {
  padding: 14px 16px;
  height: $box-height;
  width: $box-width;
  border-radius: 5px;
  .bg-color-black {
    height: $box-height - 30px;
    border-radius: 10px;
  }
  .text {
    color: #bf0008;
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
