<template>
  <div id="fourRight">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-area" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">任务运行失败率</span>
          <!-- <div class="decoration2">
            <dv-decoration-2 />
          </div> -->
        </div>
      </div>
      <div class="linebg-task">
        <div class="ech-line-task">
          <Chart :cdata="taskFailureDeptList" :isPercent="true" :height="'236px'" :ename="'按部门'" />
          <!-- <Chart :cdata="taskFailureWorkerList" :isPercent="true" :height="'236px'" :ename="'按Worker'" /> -->
        </div>
        <div class="tips">失败率=当天运行任务失败总数/当天任务运行总数</div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from '@/components/echart/line3/chart'
import Api from '@/api/monitor.js'
const sers = [
  {
    name: 'Email',
    type: 'line',
    stack: 'Total',
    data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210]
  },
  {
    name: 'Union Ads',
    type: 'line',
    stack: 'Total',
    data: [220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330, 310]
  },
  {
    name: 'Video Ads',
    type: 'line',
    stack: 'Total',
    data: [150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 330, 410]
  },
  {
    name: 'Direct',
    type: 'line',
    stack: 'Total',
    data: [320, 332, 301, 334, 390, 330, 320, 320, 332, 301, 334, 390, 330, 320]
  },
  {
    name: 'Search Engine',
    type: 'line',
    stack: 'Total',
    data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320]
  },
  {
    name: 'Emal',
    type: 'line',
    stack: 'Total',
    data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210]
  },
  {
    name: 'Unn Ads',
    type: 'line',
    stack: 'Total',
    data: [220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330, 310]
  },
  {
    name: 'Vido Ads',
    type: 'line',
    stack: 'Total',
    data: [150, 232, 201, 154, 190, 330, 410, 820, 932, 901, 934, 1290, 1330, 1320]
  },
  {
    name: 'Diret',
    type: 'line',
    stack: 'Total',
    data: [320, 332, 301, 334, 390, 330, 320, 150, 232, 201, 154, 190, 330, 410]
  },
  {
    name: 'Search Enine',
    type: 'line',
    stack: 'Total',
    data: [820, 932, 901, 934, 1290, 1330, 1320, 234, 290, 330, 310, 220, 182, 191]
  },
  {
    name: 'Eml',
    type: 'line',
    stack: 'Total',
    data: [120, 132, 101, 134, 90, 230, 210, 220, 182, 191, 234, 290, 330, 310]
  },
  {
    name: 'Union As',
    type: 'line',
    stack: 'Total',
    data: [220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330, 310]
  },
  {
    name: 'Vdeo Ads',
    type: 'line',
    stack: 'Total',
    data: [150, 232, 201, 154, 190, 330, 410, 120, 132, 101, 134, 90, 230, 210]
  },
  {
    name: 'Drect',
    type: 'line',
    stack: 'Total',
    data: [320, 332, 301, 334, 390, 330, 320, 120, 132, 101, 134, 90, 230, 210]
  },
  {
    name: 'Seach Engine',
    type: 'line',
    stack: 'Total',
    data: [820, 932, 901, 934, 1290, 1330, 1320, 150, 232, 201, 154, 190, 330, 410]
  },
  {
    name: 'Emil',
    type: 'line',
    stack: 'Total',
    data: [120, 132, 101, 134, 90, 230, 210, 320, 332, 301, 334, 390, 330, 320]
  },
  {
    name: 'Uion Ads',
    type: 'line',
    stack: 'Total',
    data: [220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330, 310]
  },
  {
    name: 'Vieo Ads',
    type: 'line',
    stack: 'Total',
    data: [150, 232, 201, 154, 190, 330, 410, 220, 182, 191, 234, 290, 330, 310]
  },
  {
    name: 'Diect',
    type: 'line',
    stack: 'Total',
    data: [320, 332, 301, 334, 390, 330, 320, 820, 932, 901, 934, 1290, 1330, 1320]
  },
  {
    name: 'Searchngine',
    type: 'line',
    stack: 'Total',
    data: [820, 932, 901, 934, 1290, 1330, 1320, 220, 182, 191, 234, 290, 330, 310]
  }
]
const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon1', 'Tue1', 'Wed1', 'Thu1', 'Fri1', 'Sat1', 'Sun1']
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
      taskFailureDeptList: {
        serDatas: [],
        week: []
      },
      taskFailureWorkerList: {
        week: [],
        serDatas: []
      }
    }
  },
  mounted() {
    const that = this
    this.getTaskFailureDeptRate()
    // this.getTaskFailureWorkerRate()
    this.interval = window.setInterval(function() {
      that.getTaskFailureDeptRate()
      // this.getTaskFailureWorkerRate()
    }, this.refreshInterval)
  },
  beforeDestroy() {
    window.clearInterval(this.interval)
  },
  methods: {
    getTaskFailureDeptRate() {
      Api.getTaskFailureDeptRate({}).then(response => {
        this.taskFailureDeptList = {
          serDatas: [],
          week: []
        }
        console.log(new Date().getTime())
        if (response.code == 200) {
          this.taskFailureDeptList.week = response.data.queryDateList
          this.taskFailureDeptList.serDatas = response.data.taskRateList
        }
      })
    },
    getTaskFailureWorkerRate() {
      Api.getTaskFailureWorkerRate({}).then(response => {
        this.taskFailureWorkerList = {
          serDatas: [],
          week: []
        }

        if (response.code == 200) {
          this.taskFailureWorkerList.week = response.data.queryDateList
          this.taskFailureWorkerList.serDatas = response.data.taskRateList
        }
      })
    }
  }
}
</script>

<style lang="scss" class>
#fourRight {
  padding: 14px 16px;
  height: 100%;
  width: 100%;
  border-radius: 5px;

  .linebg-task {
    background-color: #fff;
    width: 100%;

    .ech-line-task {
      display: flex;
      width: 100%;
      gap: 10px;
    }

    .tips {
      color: #3d475c;
      font-size: 12px;
      width: 611px;
      text-align: center;
    }
    .ech {
      width: 610px;
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
}
</style>
