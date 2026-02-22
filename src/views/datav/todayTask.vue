<template>
  <div id="center">
    <div class="title">今日任务</div>
    <div class="today">
      <card2 :num="todayTasksuccess" class="card" :backgroundColor="'#fff'" :numColor="'#B51E23'" :describe="'运行成功'" :icon="require('@/assets/datav/p3.png')" />
      <div class="divide"></div>
      <card2 :num="todayTaskfailed" class="card" :backgroundColor="'#fff'" :numColor="'#B51E23'" :describe="'运行失败'" :icon="require('@/assets/datav/p2.png')" />
      <div class="divide"></div>
      <card2 :num="todayTaskrunning" class="card" :backgroundColor="'#fff'" :numColor="'#B51E23'" :describe="'正在运行'" :icon="require('@/assets/datav/p5.png')" />
      <div class="divide"></div>
      <card2 :num="todayTaskdeploying" class="card" :backgroundColor="'#fff'" :numColor="'#B51E23'" :describe="'等待运行'" :icon="require('@/assets/datav/p2.png')" />
      <div class="divide"></div>
      <div class="water" style="overflow: hidden; height: 100%;position: relative;">
        <div style="text-align: center;font-size: 18px;font-weight: 700;position: relative;z-index: 1111;padding-top: 18px;">成功率：{{ water.data[0] }}%</div>
        <img :src="wave" alt="" :style="waveStyle" />
      </div>
    </div>
  </div>
</template>

<script>
import wave from '../../assets/wave.gif'
import card2 from './components/card2'
import Api from '@/api/datav.js'
export default {
  components: {
    card2
  },
  props: {
    refreshInterval: {
      type: Number,
      default: function() {
        return 30000
      }
    }
  },
  data() {
    return {
      wave,
      interval: null,
      todayTasksuccess: 0,
      todayTaskdeploying: 0,
      todayTaskfailed: 0,
      todayTaskrunning: 0,
      water: {
        data: [50],
        shape: 'roundRect',
        formatter: '{value}%',
        waveNum: 10,
        waveHeight: 50,
        colors: ['#FFC8BF', '#ffFFC8BF']
      }
    }
  },
  computed: {
    waveStyle() {
      return `width: 100%; height: 180px; position: absolute; top: ${(((this.water?.data[0] || 0) * 58) / 100) * -1 + 38}px;`
    }
  },
  mounted() {
    const that = this
    this.getTopinfoTodayRuninfo()
    this.interval = window.setInterval(function() {
      that.getTopinfoTodayRuninfo()
    }, this.refreshInterval)
  },
  beforeDestroy() {
    window.clearInterval(this.interval)
  },
  methods: {
    getTopinfoTodayRuninfo() {
      let that = this
      Api.getTopinfoTodayRuninfo({}).then(response => {
        that.water.data = []
        if (response.code == 200) {
          let res = response.data || {}
          this.todayTasksuccess = res.todayTasksuccess
          this.todayTaskrunning = res.todayTaskrunning
          this.todayTaskfailed = res.todayTaskfailed
          this.todayTaskdeploying = res.todayTaskdeploying
          //res.taskSuccessRate
          let num = res.taskSuccessRate || 0,
            base = 15
          let water
          if (num > 65) {
            water = this.getWater(base, num)
            water.data = [num]
          } else {
            water = this.getWater(base, num)
            water.data = [num]
          }
          this.water = water
        }
      })
    },

    getWater(base, num) {
      return {
        data: [],
        shape: 'roundRect',
        formatter: '成功率：' + num + '%',
        waveNum: 2,
        waveHeight: base - 0,
        colors: ['#E76369', '#E31818']
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.water::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border: 4px solid #fff;
  z-index: 54654;
}
#center {
  $box-today: 76px;
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  // padding: 10px;
  padding-left: 20px;
  margin-top: -35px;

  .title {
    // background-color: #f3d0d2;
    position: relative;
    left: 47%;
    font-size: 20px;
    width: 100px;
    font-weight: 600;
  }
  .today {
    height: $box-today;
    display: flex;
    margin-top: 10px;

    .card {
      flex: 1;
      padding-left: 20px;
    }

    .divide {
      background-color: #f3d0d2;
      height: 45px;
      margin: auto 10px;
      width: 2px;
    }

    .water {
      flex: 1;
      margin: auto 0;
      border: 2px solid;
      border-radius: 8px;
      .dv-wa-le-po {
        margin-top: -12px;
        height: $box-today + 20px;
      }

      :deep .dv-water-pond-level text {
        font-size: 18px;
        font-weight: 300;
      }
    }

    @keyframes spin {
      50% {
        transform: translate(-50%, -101%) rotate(750deg);
      }
      100% {
        transform: translate(-50%, -101%) rotate(1500deg);
      }
    }
    .wave-progress {
      width: 100%;
      height: 80px;
      border-radius: 5px;
      background: #ffffff;
      overflow: hidden;
      position: relative;
    }
    .wave {
      position: relative;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(-180deg, #ffeded 13%, #ffa196 100%);
      border-radius: 5px;
    }
    #wave-mask {
      position: absolute;
      width: 300px;
      height: 300px;
      top: 40%;
      left: 25%;
      border-radius: 45%;
      transform: translate(-50%, -101%) rotate(0);
      animation: spin linear 15s infinite;
      z-index: 20;
      background-color: #fff;
    }
    #wave-mask2 {
      position: absolute;
      width: 350px;
      height: 350px;
      top: 40%;
      left: 75%;
      border-radius: 45%;
      transform: translate(-50%, -101%) rotate(0);
      animation: spin linear 18s infinite;
      z-index: 20;
      background-color: #fff;
    }
    #num {
      position: absolute;
      width: 100%;
      height: 100%;
      color: #fff;
      font-size: 16px;
      line-height: 100px;
      font-weight: bold;
      text-align: center;
      z-index: 100;
    }
  }
}
</style>
