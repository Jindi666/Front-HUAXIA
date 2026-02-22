<template>
  <div id="bottomLeft">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-bar" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">部门执行数量、执行成功率</span>
        </div>
      </div>
      <div>
        <Chart :cdata="config" />
      </div>
    </div>
  </div>
</template>

<script>
import Chart from '@/components/echart/barline/chart'
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
      config: {}
    }
  },
  mounted() {
    const that = this
    this.getTaskSuccRateDepartment()
    this.interval = window.setInterval(function() {
      that.getTaskSuccRateDepartment()
    }, this.refreshInterval)
  },
  beforeDestroy() {
    window.clearInterval(this.interval)
  },
  methods: {
    getTaskSuccRateDepartment() {
      Api.getTaskSuccRateDepartment({}).then(response => {
        if (response.code == 200) {
          const tableOptions = this.getScrollTableOptions()
          response.data.forEach(item => {
            tableOptions.rateData.push(item.succRatePercent)
            tableOptions.lineData.push(item.totalTask)
            tableOptions.barData.push(item.totalSucc)
            tableOptions.Deptname.push(item.deptName)
          })
          this.config = tableOptions
        }
      })
    },
    getScrollTableOptions() {
      return {
        category: [],
        lineData: [],
        barData: [],
        rateData: [],
        Deptname: []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$box-height: 320px;
$box-width: 100%;
#bottomLeft {
  padding: 20px 16px;
  height: $box-height;
  width: $box-width;
  border-radius: 5px;
  .bg-color-black {
    height: $box-height - 35px;
    border-radius: 10px;
  }
  .text {
    color: #bf0008;
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
