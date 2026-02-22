<template>
  <div id="bottomRight">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-area" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">机器人在线监控</span>
          <!-- <div class="decoration2">
            <dv-decoration-2 />
          </div> -->
        </div>
      </div>
      <div class="linebg">
        <Chart :cdata="cdata" :height="'224px'" :ename="'机器人在线总数' + num + '个'" class="ech" />
      </div>
    </div>
  </div>
</template>

<script>
import Chart from '@/components/echart/line2/chart'
export default {
  data() {
    return {
      num: 12,
      drawTiming: null,
      cdata: {
        year: 2023,
        weekCategory: ['4/1', '4/2', '4/3', '4/4', '4/5', '4/6', '4/7'],
        maxData: 20000,
        weekMaxData: [2635, 2678, 2567, 2670, 2690, 2680, 2655],
        weekLineData: [2600, 2658, 2550, 2635, 2660, 2656, 2635]
      },
      showType: false
    }
  },
  components: {
    Chart
  },
  mounted() {
    this.drawTimingFn()
  },
  beforeDestroy() {
    clearInterval(this.drawTiming)
  },
  methods: {
    drawTimingFn() {
      this.setData()
      this.drawTiming = setInterval(() => {
        this.setData()
      }, 1000)
    },
    setData() {
      // // 清空轮询数据
      // this.cdata.weekCategory = []
      // this.cdata.weekMaxData = []
      // this.cdata.weekLineData = []
      // this.cdata.radarData = []
      // this.cdata.radarDataAvg = []
      // let dateBase = new Date()
      // this.cdata.year = dateBase.getFullYear()
      // // 周数据
      // for (let i = 0; i < 7; i++) {
      //   // 日期
      //   let date = new Date()
      //   this.cdata.weekCategory.unshift(
      //     [date.getMonth() + 1, date.getDate() - i].join('/')
      //   )
      //   // 折线图数据
      //   this.cdata.weekMaxData.push(this.cdata.maxData)
      //   let distance = Math.round(Math.random() * 100)
      //   this.cdata.weekLineData.push(distance)
      //   // 雷达图数据
      //   // 我的指标
      //   let averageSpeed = +(Math.random() * 5 + 3).toFixed(3)
      //   let maxSpeed = averageSpeed + +(Math.random() * 3).toFixed(2)
      //   let hour = +(distance / 100 / averageSpeed).toFixed(1)
      //   let radarDayData = [distance, averageSpeed, maxSpeed, hour]
      //   this.cdata.radarData.unshift(radarDayData)
      //   // 平均指标
      //   let distanceAvg = Math.round(Math.random() * 100)
      //   let averageSpeedAvg = +(Math.random() * 100 + 4).toFixed(3)
      //   let maxSpeedAvg = averageSpeedAvg + +(Math.random() * 100).toFixed(2)
      //   let hourAvg = +(distance / averageSpeed).toFixed(1)
      //   let radarDayDataAvg = [
      //     distanceAvg,
      //     averageSpeedAvg,
      //     maxSpeedAvg,
      //     hourAvg,
      //   ]
      //   this.cdata.radarDataAvg.unshift(radarDayDataAvg)
      // }
    }
  }
}
</script>

<style lang="scss" class>
#bottomRight {
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
