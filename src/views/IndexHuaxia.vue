<template>
  <div id="index" ref="appRef">
    <div class="bg">
      <!-- <div class="snow"></div>
      <div class="snow"></div>
      <div class="snow"></div>
      <div class="snow"></div>
      <div class="snow"></div> -->
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else class="host-body">
        <div class="d-flex jc-center">
          <dv-decoration-10 class="dv-dec-10" :color="decorationColor" />
          <div class="d-flex jc-center">
            <dv-decoration-8 class="dv-dec-8" :color="decorationColor" />
            <div class="title">
              <img class="img" :src="imgSrc" />
              <span class="title-text">可视化看板</span>
              <dv-decoration-6 class="dv-dec-6" :reverse="true" :color="['#B71D25', '#E5999C']" />
            </div>
            <dv-decoration-8 class="dv-dec-8" :reverse="true" :color="decorationColor" />
          </div>
          <dv-decoration-10 class="dv-dec-10-s" :color="decorationColor" />
        </div>

        <!-- 第二行 -->
        <div class="d-flex jc-between px-2">
          <div class="d-flex aside-width">
            <div class="react-left ml-4 react-l-s">
              <span class="react-left"></span>
              <span class="text"></span>
            </div>
            <div class="react-left ml-3">
              <span class="text"></span>
            </div>
          </div>
          <div class="d-flex aside-width">
            <div class="react-right mr-3">
              <!-- <span class="text fw-b">vue-big-screen</span> -->
            </div>
            <div class="react-right mr-4 react-l-s">
              <span class="react-after"></span>
              <span class="text">{{ dateYear }} {{ dateWeek }} {{ dateDay }}</span>
            </div>
          </div>
        </div>

        <!-- <div class="body-box"> -->
        <div class="third-content">
          <div class="top">
            <card
              :num="taskSucceed"
              :backgroundColor="'#FFEDED'"
              :numColor="'#B71D25'"
              :fontColor="'#3D475C'"
              :describe="'总运行成功次数'"
              :icon="require('@/assets/datav/c1.png')"
            />
            <card :num="flowCount" :backgroundColor="'#FFEDED'" :numColor="'#B71D25'" :fontColor="'#3D475C'" :describe="'总流程数'" :icon="require('@/assets/datav/c2.png')" />
            <card :num="totalTask" :backgroundColor="'#FFEDED'" :numColor="'#B71D25'" :fontColor="'#3D475C'" :describe="'计划任务数'" :icon="require('@/assets/datav/c3.png')" />
            <card :num="laborTime" :backgroundColor="'#FFEDED'" :numColor="'#B71D25'" :fontColor="'#3D475C'" :describe="'累计节省工时'" :icon="require('@/assets/datav/c4.png')" />
            <card
              :num="flowDeptcount"
              :backgroundColor="'#FFEDED'"
              :numColor="'#B71D25'"
              :fontColor="'#3D475C'"
              :describe="'流程部门数'"
              :icon="require('@/assets/datav/c5.png')"
            />
            <card :num="usercount" :backgroundColor="'#FFEDED'" :numColor="'#B71D25'" :fontColor="'#3D475C'" :describe="'用户数'" :icon="require('@/assets/datav/c6.png')" />
          </div>
        </div>
        <div class="four-content">
          <div class="left">
            <div class="first">
              <dv-border-box-11 title="今日任务" class="today-box" :color="['#E5999C', '#F8F8F8']">
                <todayTask />
              </dv-border-box-11>
            </div>
            <div class="second">
              <div class="left">
                <dv-border-box-13 :color="decorationColor">
                  <departmentExecution />
                </dv-border-box-13>
              </div>
              <div class="right">
                <dv-border-box-13 :color="decorationColor"><processesNum /></dv-border-box-13>
              </div>
            </div>
            <div class="third">
              <div class="left">
                <dv-border-box-13 class="left" :color="decorationColor">
                  <runSuccessfully />
                </dv-border-box-13>
                <div class="right" v-if="hasManMachine">
                  <div><img class="img-title" :src="imgUibotWorker" alt="" /></div>
                  <div class="woker-flex">
                    <uibotWorker className="zero" :num="woker.unmannedOnline" :name="'在线数量'" :img="require('@/assets/datav/uibotOnline.png')" />
                    <uibotWorker className="zero" :num="woker.unmannedNotOnline" :name="'离线数量'" :img="require('@/assets/datav/uibotOffline.png')" />
                  </div>
                  <div><img class="img-title" :src="imgUserWorker" alt="" /></div>
                  <div class="woker-flex">
                    <uibotWorker className="zero" :num="woker.manMachineOnline" :name="'在线数量'" :img="require('@/assets/datav/userOnline.png')" />
                    <uibotWorker className="zero" :num="woker.manMachineNotOnline" :name="'离线数量'" :img="require('@/assets/datav/userOffline.png')" />
                  </div>
                </div>
                <div class="right" v-else>
                  <div><img class="img-title" :src="imgUibotWorker" alt="" /></div>
                  <div class="woker-flex">
                    <uibotWorker :num="woker.unmannedOnline" :name="'在线数量'" :img="require('@/assets/datav/uibotOnline.png')" />
                    <uibotWorker :num="woker.unmannedNotOnline" :name="'离线数量'" :img="require('@/assets/datav/uibotOffline.png')" />
                  </div>
                </div>
              </div>
              <div class="right">
                <dv-border-box-13 :color="decorationColor"><taskNum /></dv-border-box-13>
              </div>
            </div>
          </div>
          <div class="right">
            <dv-border-box-13 class="top" :color="decorationColor">
              <work-hours></work-hours>
            </dv-border-box-13>
            <dv-border-box-13 class="bottom" :color="decorationColor">
              <taskCompleted />
            </dv-border-box-13>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import drawMixin from '../utils/drawMixin'
import { formatTime2 } from '../utils/index.js'
import taskCompleted from './datav/taskCompleted'
import departmentExecution from './datav/departmentExecution'
import runSuccessfully from './datav/runSuccessfully'
import workHours from './datav/workHours'
import taskNum from './datav/taskNum'
import processesNum from './datav/processesNum'
import todayTask from './datav/todayTask'
import imgSrc from './../assets/logo.png'
import card from './datav/components/card2'
import uibotWorker from './datav/components/uibotWorker'
import Api from '@/api/datav.js'
import imgUibotWorker from './../assets/datav/uibotWoker.png'
import imgUserWorker from './../assets/datav/userWoker.png'
import imgUibotOffline from './../assets/datav/uibotOffline.png'
import dian from './../assets/datav/dian.gif'

export default {
  mixins: [drawMixin],
  data() {
    return {
      dian,
      imgUibotOffline,
      imgUserWorker,
      imgUibotWorker,
      interval: null,
      refreshInterval: 30000,
      timing: null,
      loading: true,
      dateDay: null,
      dateYear: null,
      dateWeek: null,
      weekday: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      decorationColor: ['#E5999C', '#CE3D43'],
      imgSrc,
      flowCount: 0,
      laborTime: 0,
      taskFailed: 0,
      taskSucceed: 0,
      totalTask: 0,
      usercount: 0,
      flowDeptcount: 0,
      woker: {
        manMachineOnline: 0,
        manMachineNotOnline: 0,
        unmannedOnline: 0,
        unmannedNotOnline: 0
      }
    }
  },
  components: {
    processesNum,
    taskNum,
    card,
    uibotWorker,
    todayTask,
    workHours,
    taskCompleted,
    departmentExecution,
    runSuccessfully
  },
  computed: {
    hasManMachine() {
      return this.woker && this.woker.manMachineOnline && this.woker.manMachineOnline > 0
    }
  },
  mounted() {
    this.timeFn()
    const that = this
    // 先调用数据接口，成功后再取消 loading
    Promise.all([
      this.getTaskStatistics(),
      this.getWorkerOnline()
    ]).finally(() => {
      // 无论成功或失败，都在请求完成后取消 loading
      this.cancelLoading()
    })

    this.interval = window.setInterval(function() {
      that.getTaskStatistics()
      that.getWorkerOnline()
    }, this.refreshInterval)
  },
  beforeDestroy() {
    clearInterval(this.timing)
    window.clearInterval(this.interval)
  },
  methods: {
    getTaskStatistics() {
      return Api.getTaskStatistics({}).then(response => {
        if (response.code == 200) {
          let res = response.data
          this.taskSucceed = res.taskSucceed
          this.flowCount = res.flowCount
          this.totalTask = res.totalTask
          this.laborTime = res.laborTime
          this.flowCount = res.flowCount
          this.flowDeptcount = res.flowDeptcount
          this.usercount = res.usercount
        }
      }).catch(error => {
        console.error('获取任务统计数据失败:', error)
      })
    },
    getWorkerOnline() {
      return Api.getWorkerOnline({}).then(response => {
        if (response.code == 200 && response.data) {
          // 确保 response.data 不为 null 再赋值
          this.woker = {
            manMachineOnline: response.data.manMachineOnline || 0,
            manMachineNotOnline: response.data.manMachineNotOnline || 0,
            unmannedOnline: response.data.unmannedOnline || 0,
            unmannedNotOnline: response.data.unmannedNotOnline || 0
          }
        }
      }).catch(error => {
        console.error('获取 Worker 在线数据失败:', error)
      })
    },
    timeFn() {
      this.timing = setInterval(() => {
        this.dateDay = formatTime2(new Date(), 'HH: mm: ss')
        this.dateYear = formatTime2(new Date(), 'yyyy-MM-dd')
        this.dateWeek = this.weekday[new Date().getDay()]
      }, 1000)
    },
    cancelLoading() {
      setTimeout(() => {
        this.loading = false
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/index.scss';
$box-gap: 12px;

@function random_range($min, $max) {
  $rand: random();
  $random_range: $min + floor($rand * (($max - $min) + 1));
  @return $random_range;
}

.snow {
  $total: 200;
  position: absolute;
  width: 10px;
  height: 10px;
  background: rgb(241, 4, 4);
  border-radius: 50%;

  @for $i from 1 through $total {
    $random-x: random(1000000) * 0.0001vw;
    $random-offset: random_range(-100000, 100000) * 0.0001vw;
    $random-x-end: $random-x + $random-offset;
    $random-x-end-yoyo: $random-x + ($random-offset / 2);
    $random-yoyo-time: random_range(30000, 80000) / 100000;
    $random-yoyo-y: $random-yoyo-time * 100vh;
    $random-scale: random(10000) * 0.0001;
    $fall-duration: random_range(10, 30) * 1s;
    $fall-delay: random(30) * -1s;

    &:nth-child(#{$i}) {
      opacity: random(10000) * 0.0001;
      transform: translate($random-x, -10px) scale($random-scale);
      animation: fall-#{$i} $fall-duration $fall-delay linear infinite;
    }

    @keyframes fall-#{$i} {
      #{percentage($random-yoyo-time)} {
        transform: translate($random-x-end, $random-yoyo-y) scale($random-scale);
      }

      to {
        transform: translate($random-x-end-yoyo, 100vh) scale($random-scale);
      }
    }
  }
}

.bosx {
  path {
    stroke-width: 1 !important; // 边框的粗细
  }
}

.third-content {
  margin-top: $box-gap;
  .top {
    width: 100%;
    height: 96px;
    padding: 0 4px;
    display: flex;
    gap: $box-gap;
  }
}

.four-content {
  display: flex;
  .left {
    flex: 1;

    .first {
      margin-top: $box-gap;
      width: 100%;
      height: auto;
      .today-box {
        width: 100%;
        height: 155px;
        padding: 50px 0px 0px 0px;
      }

      .border11 text.dv-border-box-11-title[fill] {
        // border11 字体颜色
        fill: #b51e23;
      }
    }

    .second {
      $box-sec-height: 324px;
      margin-top: $box-gap;
      width: 100%;
      display: flex;
      height: $box-sec-height;
      .left {
        flex: 1;
        height: $box-sec-height;
      }
      .right {
        width: 458px;
        height: $box-sec-height;
      }
    }

    .third {
      $box-sec-height: 334px;
      margin-top: $box-gap;
      width: 100%;
      display: flex;
      height: $box-sec-height;
      .left {
        flex: 1;
        display: flex;
        height: $box-sec-height;

        .left {
          width: 400px;
        }

        .right {
          width: 360px;
          margin-top: 5px;
          height: $box-sec-height - 10px;
          border: 1px #bf000855 solid;
          padding: 10px;
          text-align: center;

          .img-title {
            width: 340px;
            background-size: cover;
          }

          .woker-flex {
            display: flex;
            text-align: center;
            width: 100%;
            height: 132px;
          }
        }
      }
      .right {
        width: 458px;
        height: $box-sec-height;
      }
    }
  }

  .right {
    margin-left: $box-gap;
    width: 630px;

    .top {
      margin-top: $box-gap;
      height: 412px;
    }
    .bottom {
      margin-top: $box-gap;
      height: 413px;
    }
  }
}
</style>
