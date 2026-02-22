<template>
  <div id="thirdRight">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-area" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">机器人分布（离线/总数）</span>
          <!-- <div class="decoration2">
            <dv-decoration-2 />
          </div> -->
        </div>
      </div>
      <div class="linebg">
        <div class="robot-total">{{ workerOfflineSum }}/{{ workerCountSum }}<br />机器人总数</div>
        <Chart :cdata="cdata" class="ech" />
      </div>
    </div>
  </div>
</template>

<script>
import Chart from '@/components/echart/treemap/chart'
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
      workerCountSum: 0,
      workerOfflineSum: 0,
      cdata: [],
      showType: false
    }
  },
  components: {
    Chart
  },
  mounted() {
    const that = this
    this.getRobotOnlineMonitoring()
    this.interval = window.setInterval(function() {
      that.getRobotOnlineMonitoring()
    }, this.refreshInterval)
  },
  beforeDestroy() {
    window.clearInterval(this.interval)
  },
  methods: {
    getRobotOnlineMonitoring() {
      Api.getRobotOnlineMonitoring({}).then(response => {
        if (response.code == 200) {
          let res = response.data
          this.workerCountSum = res.workerCountSum
          this.workerOfflineSum = res.workerOfflineSum
          this.cdata = []
          res.robotOnlineBeansList.forEach(item => {
            this.cdata.push({
              value: item.workerOfflineRate,
              name: item.deptName,
              workerCount: item.workerCount,
              workerOfflineRate: item.workerOfflineRate,
              workerOffline: item.workerOffline
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" class>
#thirdRight {
  padding: 14px 16px;
  height: 100%;
  width: 100%;
  border-radius: 5px;

  .linebg {
    margin-top: 10px;
    width: 390px;
    height: 305px;
    background-color: #ffe4e6;
    display: flex;
    .robot-total {
      width: 94px;
      height: 100%;
      position: relative;
      text-align: center;
      top: 48%;
      color: #000;
    }
    .ech {
      flex: 1;
      height: 305px;
      background-color: #ffe4e6;
      padding: 10px;
    }
  }

  .bg-color-black {
    background-color: #fff;
    height: 100%;
    border-radius: 10px;
  }
  .text {
    color: #bf0008;
    margin-top: -3px;
    font-size: 14px;
  }
  //下滑线动态
  .decoration2 {
    position: absolute;
    right: 0.125rem;
  }
  .chart-box {
    margin-top: 16px;
    width: 150px;
    height: 100%;
    .active-ring-name {
      padding-top: 10px;
    }
  }
}
</style>
